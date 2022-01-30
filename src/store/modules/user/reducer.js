import { produce } from 'immer';

import { TYPE_USER_DATA_REQUEST, TYPE_USER_DATA_SUCCESS, TYPE_USER_DATA_FAILURE } from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  loading: false,
  user: null,
  repos: null,
  starred: null
};

export function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_USER_DATA_REQUEST: {
        draft.loading = true;
        break;
      }

      case TYPE_USER_DATA_SUCCESS: {
        draft.user = action.payload.user;
        draft.repos = action.payload.repos;
        draft.starred = action.payload.starred;
        break;
      }

      case TYPE_USER_DATA_FAILURE: {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
