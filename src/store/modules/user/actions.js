import { TYPE_USER_DATA_REQUEST, TYPE_USER_DATA_SUCCESS, TYPE_USER_DATA_FAILURE } from '../../../constants/types-reducers';

export function userRequest(user) {
  return {
    type: TYPE_USER_DATA_REQUEST,
    payload: { user }
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
