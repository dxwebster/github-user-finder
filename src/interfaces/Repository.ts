export interface Respositories {
  pageable: any;
  data: Repository[];
}
export interface Repository {
  full_name: string;
  description?: string;
}
