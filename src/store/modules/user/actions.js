import { TYPE_USER_REQUEST, TYPE_USER_SUCCESS, TYPE_USER_FAILURE } from '../../../constants/types-reducers';

export function userRequest(user) {
  console.log('✅ ~ user actions', user);
  return {
    type: TYPE_USER_REQUEST,
    payload: { user }
  };
}
export function userSuccess(courses) {
  return {
    type: TYPE_USER_SUCCESS,
    payload: courses
  };
}
export function userFailure(error) {
  return {
    type: TYPE_USER_FAILURE,
    payload: error
  };
}
