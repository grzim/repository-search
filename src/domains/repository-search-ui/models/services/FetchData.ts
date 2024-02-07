import { APIGetResponse } from '@ui/models/repositories/APIGetResponse';
import { PaginationOptions, SearchOptions } from '@ui/models/entities';

export type FetchData = <DataType>(
  options: SearchOptions & PaginationOptions,
) => Promise<APIGetResponse<DataType>>;
