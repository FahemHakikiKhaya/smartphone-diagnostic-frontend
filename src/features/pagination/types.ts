export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export type PaginationQueries = {
  take: number;
  page: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

export type PaginationMeta = {
  page: number;
  take: number;
  totalPages: number;
};

export type PaginationResponse<T> = {
  data: T[];
  meta: PaginationMeta;
};
