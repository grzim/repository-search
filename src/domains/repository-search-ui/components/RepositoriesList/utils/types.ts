import { Repository } from '@ui/models/entities';
import { StringToReactNode } from '@src/utils';

export type RepoWithJsx = StringToReactNode<Repository, `name`>;
