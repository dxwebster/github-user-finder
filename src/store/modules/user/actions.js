import {
  TYPE_USER_DATA_REQUEST,
  TYPE_USER_DATA_SUCCESS,
  TYPE_USER_DATA_FAILURE,
  TYPE_USER_REPOS_REQUEST,
  TYPE_USER_REPOS_SUCCESS,
  TYPE_USER_REPOS_FAILURE
} from '../../../constants/types-reducers';

export function userRequest(username) {
  return {
    type: TYPE_USER_DATA_REQUEST,
    payload: { username }
  };
}

export function userSuccess(user, repos, starred) {
  return {
    type: TYPE_USER_DATA_SUCCESS,
    payload: { user, repos, starred }
  };
}

export function userFailure(error) {
  return {
    type: TYPE_USER_DATA_FAILURE,
    payload: error
  };
}

export function reposRequest(username, pageNumber = 0) {
  return {
    type: TYPE_USER_REPOS_REQUEST,
    payload: { username, pageNumber }
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

export function setLoadingUserSearch(boolean) {
  return {
    type: 'TYPE_LOADING_USER_SEARCH',
    payload: boolean
  };
}

export function cleanStates() {
  return {
    type: 'TYPE_CLEAN_STATES'
  };
}
