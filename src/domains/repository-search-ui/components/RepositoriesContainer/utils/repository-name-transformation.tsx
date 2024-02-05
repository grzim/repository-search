import { Repository } from '@ui/models/entities';
import { replaceWithNode } from '@src/utils';
import React from 'react';
import { FetchSearchOptions } from '@ui-value-objects/search';

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

export const repositoryNameTransformation =
  (searchOptions: FetchSearchOptions) => (repo: Repository) =>
    searchOptions.searchIn.includes(`name`)
      ? boldSearchedPhrase({ ...repo, ...searchOptions })
      : composeDisplayedName(repo);
