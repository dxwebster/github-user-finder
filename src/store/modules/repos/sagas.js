import { takeLatest, all, put, call, select } from 'redux-saga/effects';
import { reposSuccess, reposFailure, searchRepoSuccess, searchRepoFailure, setIsStarred } from './actions';
import { TYPE_REPOS_REQUEST, TYPE_REPOS_SEARCH_REQUEST, TYPE_REPOS_STARRED_REQUEST } from '../../../constants/types-reducers';
import api from '../../../services/api';
import { reposMapper, searchedRepoMapper } from '../../../mappers/reposMapper';

export function* getRepos({ payload }) {
  try {
    const { username, pageNumber, size, type } = payload;
    const { user } = yield select((state) => state.user);

    let reposUrl;
    let reposResponse;
    let totalElements;

    if (type === 'starred') {
      reposUrl = `/users/${username}/starred`;
      const allstarredResponse = yield call(api.get, reposUrl, null);
      totalElements = allstarredResponse.data.length;

      reposUrl = `/users/${username}/starred?page=${pageNumber}&per_page=${size}`;
      reposResponse = yield call(api.get, reposUrl, null);
    } else {
      reposUrl = `/users/${username}/repos?page=${pageNumber}&per_page=${size}`;
      reposResponse = yield call(api.get, reposUrl, null);
      totalElements = user.public_repos;
    }

    const { reposWrapper } = reposMapper(reposResponse?.data, pageNumber, totalElements);

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
