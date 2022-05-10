export interface ApiPagination {
  readonly count: number;
  readonly currentPage: number;
  readonly nextPage: boolean;
  readonly prevPage: boolean;
  readonly lastPage: number;
}
