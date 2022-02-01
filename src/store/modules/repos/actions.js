import {
  TYPE_REPOS_REQUEST,
  TYPE_REPOS_SUCCESS,
  TYPE_REPOS_FAILURE,
  TYPE_REPOS_SET_DISPLAY,
  TYPE_REPOS_CLEAN_STATES,
  TYPE_REPOS_SEARCH_REQUEST,
  TYPE_REPOS_SEARCH_SUCCESS,
  TYPE_REPOS_SEARCH_FAILURE,
  TYPE_REPOS_FILTER_REPOS
} from '../../../constants/types-reducers';

export function reposRequest(username, pageNumber = 1, size = 4, type) {
  return {
    type: TYPE_REPOS_REQUEST,
    payload: { username, pageNumber, size, type }
  };
}

export function reposSuccess(repos) {
  return {
    type: TYPE_REPOS_SUCCESS,
    payload: { repos }
  };
}

export function reposFailure(error) {
  return {
    type: TYPE_REPOS_FAILURE,
    payload: error
  };
}

export function setDisplayRepos(list, grid) {
  return {
    type: TYPE_REPOS_SET_DISPLAY,
    payload: { list, grid }
  };
}

export function cleanReposStates() {
  return {
    type: TYPE_REPOS_CLEAN_STATES
  };
}

export function setFilterRepos(filteredRepos) {
  return {
    type: TYPE_REPOS_FILTER_REPOS,
    payload: { filteredRepos }
  };
}

export function searchRepoRequest(username, repoName) {
  return {
    type: TYPE_REPOS_SEARCH_REQUEST,
    payload: { username, repoName }
  };
}

export function searchRepoSuccess(repo) {
  return {
    type: TYPE_REPOS_SEARCH_SUCCESS,
    payload: { repo }
  };
}

export function searchRepoFailure(error) {
  return {
    type: TYPE_REPOS_SEARCH_FAILURE,
    payload: { error }
  };
}
