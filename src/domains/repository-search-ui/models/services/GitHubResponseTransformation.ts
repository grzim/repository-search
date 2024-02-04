import { GitHubResponseWrapper } from '@ui/models/repositories';

export type GitHubResponseTransformation<DataType> = (
  data: GitHubResponseWrapper<DataType>,
) => DataType;
