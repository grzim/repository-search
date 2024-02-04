import { FetchSearchOptions } from '@ui-value-objects/search';
import { APIGetResponse } from '@ui/models/repositories/APIGetResponse';
import { PaginationOptions } from '@ui/models/entities';

export type FetchData = <DataType>(
  options: FetchSearchOptions & PaginationOptions,
) => Promise<APIGetResponse<DataType>>;
