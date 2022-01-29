import { takeLatest, all, put, call } from 'redux-saga/effects';
import { userSuccess, userFailure } from './actions';
import { TYPE_USER_DATA_REQUEST } from '../../../constants/types-reducers';
import api from '../../../services/api';
import userDataMapper from '../../../mappers/userDataMapper';
import { setToLocalStorage } from '../../../helpers/local-storage';

export function* getUser({ payload }) {
  const { user } = payload;

  try {
    const url = `/users/${user}`;
    const reposUrl = `/users/${user}/repos`;
    const starredUrl = `/users/${user}/starred`;

    const userResponse = yield call(api.get, url, null);
    const reposResponse = yield call(api.get, reposUrl, null);
    const starredResponse = yield call(api.get, starredUrl, null);

    const dataWrapper = userDataMapper(userResponse.data, reposResponse.data, starredResponse.data);
    const { userMapper, reposMapper, starredMapper } = dataWrapper;

    yield put(userSuccess(userMapper, reposMapper, starredMapper));

    setToLocalStorage('@Github: user', userMapper);
    setToLocalStorage('@Github: repos', reposMapper);
  } catch (err) {
    const error = err.result ? err.result : { message: 'Erro ao buscar user.' };

    yield put(userFailure(error));
    alert(error.message);
  }
}

export default all([takeLatest(TYPE_USER_DATA_REQUEST, getUser)]);
