import { produce } from 'immer';

import {
  TYPE_USER_REPOS_REQUEST,
  TYPE_USER_REPOS_SUCCESS,
  TYPE_USER_REPOS_FAILURE,
  TYPE_USER_REPOS_LOADING,
  TYPE_REPOS_SET_DISPLAY,
  TYPE_REPOS_CLEAN_STATES
} from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  loadingRepos: false,
  repos: null,
  filteredRepos: null,
  isListActive: true,
  isGridActive: false
};

export function repos(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_USER_REPOS_REQUEST: {
        draft.loadingRepos = true;
        break;
      }
      case TYPE_USER_REPOS_SUCCESS: {
        draft.repos = action.payload.repos;
        draft.filteredRepos = action.payload.repos.data;
        break;
      }
      case TYPE_USER_REPOS_FAILURE: {
        draft.loadingRepos = false;
        break;
      }
      case TYPE_USER_REPOS_LOADING: {
        draft.repos = action.payload.repos;
        break;
      }
      case 'TYPE_REPOS_FILTER_REPOS': {
        draft.filteredRepos = action.payload.filteredRepos;
        break;
      }
      case TYPE_REPOS_SET_DISPLAY: {
        draft.isListActive = action.payload.list;
        draft.isGridActive = action.payload.grid;
        break;
      }
      case TYPE_REPOS_CLEAN_STATES: {
        draft.loadingRepos = INITIAL_STATE.loadingRepos;
        draft.repos = INITIAL_STATE.repos;
        break;
      }

      default:
    }
  });
}
