import { PaginationOptions } from '@ui/models/entities';

export type Metadata = PaginationOptions & { totalCount?: number };

export type AsyncResource<DataType> = {
  isLoading: boolean;
  data: DataType[];
  error: string | null;
} & Metadata;
