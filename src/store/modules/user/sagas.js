import { takeLatest, all, put, call } from 'redux-saga/effects';
import { userSuccess, userFailure } from './actions';
import { TYPE_USER_REQUEST } from '../../../constants/types-reducers';
import api from '../../../services/api';

export function* getUser({ payload }) {
  try {
    const { user } = payload;

    const url = `/users/${user}`;

    const { data } = yield call(api.get, url, null);

    yield put(userSuccess(data));
  } catch (err) {
    const error = err.result ? err.result : { message: 'Erro ao buscar user.' };

    yield put(userFailure(error));
    alert(error.message);
  }
}

export default all([takeLatest(TYPE_USER_REQUEST, getUser)]);
