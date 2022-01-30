import { User } from '../interfaces/User';

export function userMapper(user: User) {
  const userWrapper = {
    id: user.id,
    avatar_url: user.avatar_url,
    bio: user.bio,
    location: user.location,
    login: user.login,
    name: user.name,
    starred_url: user.starred_url,
    public_repos: user.public_repos
  };

  return { userWrapper };
}
