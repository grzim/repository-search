import { GitHubResponseWrapper } from '@ui/models/repositories/GitHubResponseWrapper';

export type APIModelToUIModelTransform<UIModel> = (
  items: GitHubResponseWrapper<UIModel>[],
) => UIModel[];
