export interface Respositories {
  pageable: any;
  data: Repository[];
  length: number;
}
export interface Repository {
  full_name: string;
  description?: string;
}
