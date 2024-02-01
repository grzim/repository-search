import { Repository } from '../ui-related/Repository';
import { GitHubResponseWrapper } from '../transformations/type-transfomrations';

export type GraphQLRepoResponse = GitHubResponseWrapper<Repository>;
