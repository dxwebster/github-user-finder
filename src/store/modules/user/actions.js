import { TYPE_USER_DATA_REQUEST, TYPE_USER_DATA_SUCCESS, TYPE_USER_DATA_FAILURE } from '../../../constants/types-reducers';

export function userRequest(username, pageNumber = 0, size = 5) {
  return {
    type: TYPE_USER_DATA_REQUEST,
    payload: { username, pageNumber, size }
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

export function setLoading(boolean) {
  return {
    type: 'TYPE_LOADING',
    payload: boolean
  };
}
