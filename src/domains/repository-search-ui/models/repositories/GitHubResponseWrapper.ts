import {
  ConvertFieldsToSnakeCase,
  ConvertNumberFieldsToObj,
  Edge,
} from '@utils/type-transformations';

export type GitHubResponseWrapper<T> = Edge<
  ConvertNumberFieldsToObj<ConvertFieldsToSnakeCase<T>>
>;
