import { Repository, SearchOptions } from '@ui/models/entities';
import { replaceWithNode } from '@src/utils';
import React, { ReactNode } from 'react';
import { RepoWithJsx } from '@ui-components/RepositoriesList/utils';

const composeDisplayedName = ({
  owner,
  name,
}: Pick<Repository, `name` | `owner`>) =>
  owner ? `${owner.login}/${name}` : name;
const boldSearchedPhrase = ({
  owner,
  name,
  searchTerm,
}: {
  owner?: Repository[`owner`];
  name: string;
  searchTerm: string;
}) =>
  replaceWithNode({
    fullText: composeDisplayedName({ owner, name }),
    node: <strong>{searchTerm}</strong>,
    partToReplaceWithNode: searchTerm,
  });

export const repositoryNameTransformation = (
  props: RepoWithJsx & SearchOptions,
): ReactNode =>
  (props.searchIn.includes(`name`) ? boldSearchedPhrase : composeDisplayedName)(
    props,
  );

export const repositoriesNameTransformation = ({
  repos,
  searchOptions,
}: {
  repos: Repository[];
  searchOptions: SearchOptions;
}): RepoWithJsx[] =>
  repos.map(
    (repo): RepoWithJsx =>
      ({
        ...repo,
        name: repositoryNameTransformation({
          ...repo,
          ...searchOptions,
        }),
      }) as RepoWithJsx,
  );
