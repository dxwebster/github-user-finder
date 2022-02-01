import { produce } from 'immer';

import {
  TYPE_USER_SUCCESS,
  TYPE_USER_FAILURE,
  TYPE_USER_REQUEST,
  TYPE_USER_LOADING,
  TYPE_USER_CLEAN_STATES
} from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  loadingUser: false,
  user: null,
  notFound: false
};

export function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_USER_REQUEST: {
        draft.loadingUser = true;
        break;
      }
      case TYPE_USER_SUCCESS: {
        draft.user = action.payload.user;
        draft.notFound = false;
        break;
      }
      case TYPE_USER_FAILURE: {
        draft.loadingUser = false;
        draft.notFound = true;
        break;
      }
      case TYPE_USER_LOADING: {
        draft.loadingUser = action.payload;
        draft.notFound = false;
        break;
      }
      case TYPE_USER_CLEAN_STATES: {
        draft.loadingUser = INITIAL_STATE.loadingUser;
        draft.user = INITIAL_STATE.user;
        draft.notFound = INITIAL_STATE.notFound;
        break;
      }

      default:
    }
  });
}
