export interface Respositories {
  pageable: any;
  data: Repository[];
}
export interface Repository {
  name: string;
  description?: string;
  html_url: string;
  stars: number;
  forks: number;
  watchers: number;
  owner?: string;
}
