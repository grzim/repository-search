export type SearchInOptions = 'name' | 'description' | 'readme';
export type OrderField = 'STARS' | 'FORKS' | 'UPDATED_AT';
export type OrderDirection = 'ASC' | 'DESC';
export type OrderBy = {
  field: OrderField;
  direction: OrderDirection;
};
export type Edge<T> = {
  node: T;
};

export type SearchResult<T> = {
  edges: Edge<T>[];
};

export type QueryResult<T> = {
  search: SearchResult<T>;
};
