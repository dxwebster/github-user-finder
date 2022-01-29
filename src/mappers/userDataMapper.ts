import { User } from '../interfaces/User';
import { Repository } from '../interfaces/Repository';

export default function userDataMapper(user: User, repos: Repository[], starred: Repository[]) {
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

  const reposMapper = repos.map((repo) => {
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
