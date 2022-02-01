import { takeLatest, all, put, call, select } from 'redux-saga/effects';
import { reposSuccess, reposFailure, searchRepoSuccess, searchRepoFailure } from './actions';
import { TYPE_REPOS_REQUEST, TYPE_REPOS_SEARCH_REQUEST } from '../../../constants/types-reducers';
import api from '../../../services/api';
import { reposMapper, searchedRepoMapper } from '../../../mappers/reposMapper';

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

export function* searchByRepoName({ payload }) {
  try {
    const { username, repoName } = payload;

    const reposUrl = `/repos/${username}/${repoName}`;

    const reposResponse = yield call(api.get, reposUrl, null);

    const { searchedRepoWrapper } = searchedRepoMapper(reposResponse?.data);

    yield put(searchRepoSuccess(searchedRepoWrapper));
  } catch (err) {
    const error = 'Repositório não encontrado.';
    yield put(searchRepoFailure(error));
  }
}

export default all([takeLatest(TYPE_REPOS_REQUEST, getRepos), takeLatest(TYPE_REPOS_SEARCH_REQUEST, searchByRepoName)]);
