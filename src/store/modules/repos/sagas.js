import { takeLatest, all, put, call, select } from 'redux-saga/effects';
import { reposSuccess, reposFailure } from './actions';
import { TYPE_USER_REPOS_REQUEST } from '../../../constants/types-reducers';
import api from '../../../services/api';
import { reposMapper } from '../../../mappers/reposMapper';

export function* getRepos({ payload }) {
  try {
    const { username, pageNumber, size } = payload;

    const { user } = yield select((state) => state.user);

    const reposUrl = `/users/${username}/repos?page=${pageNumber}&per_page=${size}`;

    const reposResponse = yield call(api.get, reposUrl, null);
    const { reposWrapper } = reposMapper(reposResponse?.data, pageNumber, user.public_repos);

    yield put(reposSuccess(reposWrapper));
  } catch (err) {
    const error = err.result ? err.result : { message: 'Erro ao buscar repositórios.' };

    yield put(reposFailure(error));
    alert(error.message);
  }
}

export default all([takeLatest(TYPE_USER_REPOS_REQUEST, getRepos)]);
