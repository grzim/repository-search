import { gql } from '@apollo/client';

export const REPOSITORIES_DETAILS_QUERY = gql`
  query SearchReactRepos(
    $searchTerm: String!
    $first: Int
    $after: String
    $before: String
    $last: Int
  ) {
    search(
      query: $searchTerm
      type: REPOSITORY
      first: $first
      after: $after
      before: $before
      last: $last
    ) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            name
            url
            stargazers {
              totalCount
            }
            forks {
              totalCount
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;
