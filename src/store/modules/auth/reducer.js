import { produce } from 'immer';

import {
  TYPE_AUTH_SIGN_IN_SUCCESS,
  TYPE_AUTH_SIGN_IN_FAILURE,
  TYPE_AUTH_SIGN_IN_REQUEST
} from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  userId: '',
  name: '',
  credencialError: ''
};

export function auth(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_AUTH_SIGN_IN_REQUEST: {
        draft.credencialError = '';
        break;
      }

      case TYPE_AUTH_SIGN_IN_SUCCESS: {
        draft.userId = action.payload.user;
        draft.name = action.payload.name;
        break;
      }
      case TYPE_AUTH_SIGN_IN_FAILURE: {
        draft.credencialError = action.payload;
        break;
      }

      default:
    }
  });
}
