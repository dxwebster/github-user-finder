import { Respositories } from '../interfaces/Repository';

export function reposMapper(repos: Respositories, pageNumber: number, totalElements: number) {
  const elementsPerPage = 6;

  const pageable = {
    pageNumber: pageNumber,
    totalElements,
    elementsPerPage,
    totalPages: Math.round(totalElements / elementsPerPage)
  };

  const reposWrapper: any = {
    pageable,
    data: repos
  };

  reposWrapper.data.map((repo: any) => {
    return {
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url
    };
  });

  return { reposWrapper };
}
