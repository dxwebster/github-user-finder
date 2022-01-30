import { Respositories, Repository } from '../interfaces/Repository';

export function reposMapper(repos: Respositories, pageNumber: number) {
  const pageable = {
    pageNumber: pageNumber,
    totalElements: repos.length,
    totalPages: repos.length
  };

  const reposWrapper: any = {
    pageable,
    data: repos
  };

  reposWrapper.data.map((repo: any) => {
    return {
      full_name: repo.full_name,
      description: repo.description
    };
  });

  return { reposWrapper };
}
