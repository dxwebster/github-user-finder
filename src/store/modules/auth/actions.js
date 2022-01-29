import {
  TYPE_AUTH_SIGN_IN_REQUEST,
  TYPE_AUTH_SIGN_IN_SUCCESS,
  TYPE_AUTH_SIGN_IN_FAILURE,
  TYPE_AUTH_SIGN_OUT
} from '../../../constants/types-reducers'


export function signInRequest(user, senha) {
  return {
    type: TYPE_AUTH_SIGN_IN_REQUEST,
    payload: { user, senha },
  };
}

export function signInSuccess(data) {
  return {
    type: TYPE_AUTH_SIGN_IN_SUCCESS,
    payload: data,
  };
}

export function signFailure(error) {
  return {
    type: TYPE_AUTH_SIGN_IN_FAILURE,
    payload: error,
  };
}

export function signOut() {
  return {
    type: TYPE_AUTH_SIGN_OUT,
  };
}
