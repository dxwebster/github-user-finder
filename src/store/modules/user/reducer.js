import { produce } from 'immer';

import { TYPE_USER_REQUEST, TYPE_USER_SUCCESS, TYPE_USER_FAILURE } from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  loading: false,
  user: null
};

export function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_USER_REQUEST: {
        draft.loading = true;
        break;
      }

      case TYPE_USER_SUCCESS: {
        draft.user = action.payload;
        draft.loading = false;
        break;
      }

      case TYPE_USER_FAILURE: {
        draft.loading = false;
        break;
      }

      default:
    }
  });
}
