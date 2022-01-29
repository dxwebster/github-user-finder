export interface Repository {
  full_name: string;
  description?: string;
  owner: {
    id: number;
    login: string;
    avatar_url: string;
    starred_url: string;
  };
}
