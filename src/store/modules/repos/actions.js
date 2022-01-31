import {
  TYPE_USER_REPOS_REQUEST,
  TYPE_USER_REPOS_SUCCESS,
  TYPE_USER_REPOS_FAILURE,
  TYPE_REPOS_SET_DISPLAY,
  TYPE_REPOS_CLEAN_STATES
} from '../../../constants/types-reducers';

export function reposRequest(username, pageNumber, size) {
  return {
    type: TYPE_USER_REPOS_REQUEST,
    payload: { username, pageNumber, size }
  };
}

export function reposSuccess(repos) {
  return {
    type: TYPE_USER_REPOS_SUCCESS,
    payload: { repos }
  };
}

export function reposFailure(error) {
  return {
    type: TYPE_USER_REPOS_FAILURE,
    payload: error
  };
}

export function setDisplayRepos(list, grid) {
  return {
    type: TYPE_REPOS_SET_DISPLAY,
    payload: { list, grid }
  };
}

export function setActiveItem(boolean) {
  return {
    type: 'TYPE_REPOS_SET_ACTIVE_ITEM'
  };
}

export function cleanReposStates() {
  return {
    type: TYPE_REPOS_CLEAN_STATES
  };
}
