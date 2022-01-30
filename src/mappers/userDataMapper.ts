import { User } from '../interfaces/User';
import { Respositories, Repository } from '../interfaces/Repository';

export default function userDataMapper(user: User, repos: Respositories, starred: Repository[]) {
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

  const pageable = {
    sort: {
      sorted: true,
      unsorted: false,
      empty: false,
      offset: 0,
      pageNumber: 0,
      pageSize: 10,
      unpaged: false,
      paged: true
    },
    totalElements: 15,
    totalPages: 2,
    last: false,
    size: 10,
    number: 0,
    numberOfElements: 10,
    first: true,
    empty: false
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

  const starredMapper = starred.map((star) => {
    return {
      full_name: star.full_name,
      description: star.description
    };
  });

  return { userMapper, reposMapper, starredMapper };
}
