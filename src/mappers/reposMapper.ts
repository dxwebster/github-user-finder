import { Respositories, Repository } from '../interfaces/Repository';

export function reposMapper(repos: Repository[], pageNumber: number, totalElements: number) {
  console.log('✅ ~ repos', repos);
  const elementsPerPage = 6;

  const pageable = {
    pageNumber: pageNumber,
    totalElements,
    elementsPerPage,
    totalPages: Math.round(totalElements / elementsPerPage)
  };

  const dataMapper = repos.map((repo: any) => {
    return {
      full_name: repo.full_name,
      description: repo.description,
      html_url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      watchers: repo.watchers_count
    };
  });

  const reposWrapper: Respositories = {
    pageable,
    data: dataMapper
  };

  console.log('✅ ~ reposWrapper', reposWrapper);

  return { reposWrapper };
}
