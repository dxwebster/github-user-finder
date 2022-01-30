import { takeLatest, all, put, call } from 'redux-saga/effects';
import { userSuccess, userFailure } from './actions';
import { TYPE_USER_DATA_REQUEST } from '../../../constants/types-reducers';
import api from '../../../services/api';
import { userMapper, reposMapper, starredMapper } from '../../../mappers/userDataMapper';
import { setToLocalStorage } from '../../../helpers/local-storage';

export function* getUser({ payload }) {
  const { username, pageNumber, size } = payload;

  try {
    const url = `/users/${username}`;
    const reposUrl = `/users/${username}/repos?page=${pageNumber}&per_page=${size}`;
    const starredUrl = `/users/${username}/starred`;

    const userResponse = yield call(api.get, url, null);
    const reposResponse = yield call(api.get, reposUrl, null);
    const starredResponse = yield call(api.get, starredUrl, null);

    const userWrapper = userMapper(userResponse.data);
    const reposWrapper = reposMapper(reposResponse.data, pageNumber, size);
    const starredWrapper = starredMapper(reposResponse.data, pageNumber, size);

    yield put(userSuccess(userWrapper, reposWrapper, starredWrapper));

    setToLocalStorage('@Github: user', userWrapper);
    setToLocalStorage('@Github: repos', reposWrapper);
  } catch (err) {
    const error = err.result ? err.result : { message: 'Erro ao buscar user.' };

    yield put(userFailure(error));
    alert(error.message);
  }
}

export default all([takeLatest(TYPE_USER_DATA_REQUEST, getUser)]);
