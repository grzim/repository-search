import {
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
  onSearchTermChange: (params: {
    searchTerm: string;
    orderBy: OrderField;
    orderDirection: OrderDirection;
    searchIn: SearchInOptions[];
  }) => void;
};
