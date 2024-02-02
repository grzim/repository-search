import { FetchSearchOptions } from '../ui-related/search';
import { FetchPaginationOptions } from './pagination';
import { APIGetResponse } from './APIGetResponse';

export type FetchData = <DataType>(
  options: FetchSearchOptions & FetchPaginationOptions,
) => Promise<APIGetResponse<DataType>>;
