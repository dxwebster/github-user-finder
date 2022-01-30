import { produce } from 'immer';

import {
  TYPE_USER_DATA_SUCCESS,
  TYPE_USER_DATA_FAILURE,
  TYPE_USER_DATA_REQUEST,
  TYPE_USER_REPOS_REQUEST,
  TYPE_USER_REPOS_SUCCESS,
  TYPE_USER_REPOS_FAILURE
} from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  loadingUser: false,
  loadingRepos: false,
  user: null,
  repos: null,
  starred: null
};

export function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_USER_DATA_REQUEST: {
        draft.loadingUser = true;
        break;
      }
      case TYPE_USER_DATA_SUCCESS: {
        draft.user = action.payload.user;
        break;
      }

      case TYPE_USER_DATA_FAILURE: {
        draft.loadingUser = false;
        break;
      }

      case TYPE_USER_REPOS_REQUEST: {
        draft.loadingRepos = true;
        break;
      }

      case TYPE_USER_REPOS_SUCCESS: {
        draft.repos = action.payload.repos;
        break;
      }

      case TYPE_USER_REPOS_FAILURE: {
        draft.loadingRepos = false;
        break;
      }

      case 'TYPE_LOADING_USER_SEARCH': {
        draft.loadingUser = action.payload;
        break;
      }

      case 'TYPE_CLEAN_STATES': {
        draft.loadingUser = INITIAL_STATE.loadingUser;
        draft.user = INITIAL_STATE.user;
        draft.repos = INITIAL_STATE.repos;
        draft.starred = INITIAL_STATE.starred;
        break;
      }

      default:
    }
  });
}
