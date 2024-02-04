import { ToVoid } from '@src/utils';

export type AsyncResource<DataType> = {
  isLoading: boolean;
  data: DataType[];
  error: string | null;
  clearError: ToVoid;
};
