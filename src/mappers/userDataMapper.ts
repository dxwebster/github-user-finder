import { User } from '../interfaces/User';
import { Respositories, Repository } from '../interfaces/Repository';

export function userMapper(user: User) {
  const userMapper = {
    id: user.id,
    avatar_url: user.avatar_url,
    bio: user.bio,
    location: user.location,
    login: user.login,
    name: user.name,
    starred_url: user.starred_url,
    public_repos: user.public_repos
  };

  return userMapper;
}

export function reposMapper(repos: Respositories, pageNumber: number, size: number) {
  const pageable = {
    pageNumber: pageNumber,
    totalElements: repos.length,
    totalPages: repos.length,
    size
  };

  const reposMapper: any = {
    pageable,
    data: repos
  };

  reposMapper.data.map((repo: any) => {
    return {
      full_name: repo.full_name,
      description: repo.description
    };
  });

  return reposMapper;
}
export function starredMapper(repos: Respositories, pageNumber: number, size: number) {
  const pageable = {
    pageNumber: pageNumber,
    totalElements: repos.length,
    totalPages: repos.length / size,
    size
  };

  const reposMapper: any = {
    pageable,
    data: repos
  };

  reposMapper.data.map((repo: any) => {
    return {
      full_name: repo.full_name,
      description: repo.description
    };
  });

  return reposMapper;
}
