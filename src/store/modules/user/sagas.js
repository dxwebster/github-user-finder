import { takeLatest, all, put, call } from 'redux-saga/effects';
import { userSuccess, userFailure, reposSuccess, setLoadingUserSearch, reposFailure } from './actions';
import { TYPE_USER_REQUEST, TYPE_USER_REPOS_REQUEST } from '../../../constants/types-reducers';
import api from '../../../services/api';
import { userMapper } from '../../../mappers/userMapper';
import { reposMapper } from '../../../mappers/reposMapper';
import { setToLocalStorage } from '../../../helpers/local-storage';

export function* getUser({ payload }) {
  try {
    const { username } = payload;

    const url = `/users/${username}`;

    const userResponse = yield call(api.get, url, null);

    const { userWrapper } = userMapper(userResponse.data);
    setToLocalStorage('@Github: user', userWrapper);

    yield put(userSuccess(userWrapper));
    yield put(setLoadingUserSearch(false));
  } catch (err) {
    const error = err.result ? err.result : { message: 'Erro ao buscar user.' };

    yield put(userFailure(error));
    alert(error.message);
  }
}

export function* getRepos({ payload }) {
  try {
    const { user, pageNumber, size } = payload;
    const { login, public_repos } = user;

    const reposUrl = `/users/${login}/repos?page=${pageNumber}&per_page=${size}`;
    const reposResponse = yield call(api.get, reposUrl, null);
    const { reposWrapper } = reposMapper(reposResponse?.data, pageNumber, public_repos);

    yield put(reposSuccess(reposWrapper));
  } catch (err) {
    const error = err.result ? err.result : { message: 'Erro ao buscar user.' };

    yield put(reposFailure(error));
    alert(error.message);
  }
}

export default all([takeLatest(TYPE_USER_REQUEST, getUser), takeLatest(TYPE_USER_REPOS_REQUEST, getRepos)]);
