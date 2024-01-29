import {
  FetchReposOptions,
  OrderDirection,
  OrderField,
  SearchInOptions,
} from '../../api/facade/types';

export type SearchState = {
  searchTerm: string;
  orderBy: OrderField;
  orderDirection: OrderDirection;
  searchIn: SearchInOptions[];
};

export type SearchComponentProps = {
  onSearchTermChange: (params: FetchReposOptions) => void;
  initialState: FetchReposOptions;
};
