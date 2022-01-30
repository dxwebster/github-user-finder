import {
  TYPE_USER_REQUEST,
  TYPE_USER_SUCCESS,
  TYPE_USER_FAILURE,
  TYPE_USER_LOADING,
  TYPE_USER_CLEAN_STATES
} from '../../../constants/types-reducers';

export function userRequest(username) {
  return {
    type: TYPE_USER_REQUEST,
    payload: { username }
  };
}

export function userSuccess(user, repos, starred) {
  return {
    type: TYPE_USER_SUCCESS,
    payload: { user, repos, starred }
  };
}

export function userFailure(error) {
  return {
    type: TYPE_USER_FAILURE,
    payload: error
  };
}

export function setLoadingUserSearch(boolean) {
  return {
    type: TYPE_USER_LOADING,
    payload: boolean
  };
}

export function cleanUserStates() {
  return {
    type: TYPE_USER_CLEAN_STATES
  };
}
