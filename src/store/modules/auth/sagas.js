import { takeLatest, put, call, all } from 'redux-saga/effects';
import { signInSuccess, signFailure } from './actions';
import { TYPE_AUTH_SIGN_IN_REQUEST } from '../../../constants/types-reducers'

import api from "../../../services/api"
import { CookiesSet } from "../../../helpers/cookies"

export function* signIn({ payload }) {
  try {
    const { user, senha } = payload;
    const url = '/auth';
    const body = { user, senha };

    const { data } = yield call(api.get, url, body);

    CookiesSet('userId', user, 1)

    if (data.user === user && data.senha === senha){
      yield put(signInSuccess(data));
    } else {
      throw data;
    }
  } catch (err) {
    const error = { message: 'Usuário ou Senha inválidos' };
    yield put(signFailure(error));
    console.log(error)
  }
}

export default all([
  takeLatest(TYPE_AUTH_SIGN_IN_REQUEST, signIn),
]);
