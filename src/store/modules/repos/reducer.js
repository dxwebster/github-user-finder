import { produce } from 'immer';

import {
  TYPE_REPOS_REQUEST,
  TYPE_REPOS_SUCCESS,
  TYPE_REPOS_FAILURE,
  TYPE_REPOS_LOADING,
  TYPE_REPOS_SET_DISPLAY,
  TYPE_REPOS_CLEAN_STATES,
  TYPE_REPOS_SEARCH_REQUEST,
  TYPE_REPOS_SEARCH_SUCCESS,
  TYPE_REPOS_SEARCH_FAILURE
} from '../../../constants/types-reducers';

export const INITIAL_STATE = {
  loadingRepos: false,
  repos: null,
  notFound: false,

  isListActive: true,
  isGridActive: false
};

export function repos(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case TYPE_REPOS_REQUEST: {
        draft.loadingRepos = true;
        break;
      }
      case TYPE_REPOS_SUCCESS: {
        draft.repos = action.payload.repos;
        draft.notFound = false;
        break;
      }
      case TYPE_REPOS_FAILURE: {
        draft.loadingRepos = false;
        draft.notFound = true;
        break;
      }

      case TYPE_REPOS_SEARCH_REQUEST: {
        draft.loadingRepos = true;
        break;
      }
      case TYPE_REPOS_SEARCH_SUCCESS: {
        draft.repos.data = [action.payload.repo];
        draft.notFound = false;
        break;
      }
      case TYPE_REPOS_SEARCH_FAILURE: {
        draft.loadingRepos = false;
        draft.notFound = true;
        break;
      }

      case TYPE_REPOS_LOADING: {
        draft.repos = action.payload.repos;
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
        draft.notFound = INITIAL_STATE.notFound;
        draft.isListActive = INITIAL_STATE.isListActive;
        draft.isGridActive = INITIAL_STATE.isGridActive;
        break;
      }

      default:
    }
  });
}
