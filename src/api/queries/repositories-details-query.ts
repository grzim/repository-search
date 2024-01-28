import { gql } from '@apollo/client';

export const REPOSITORIES_DETAILS_QUERY = gql`
  query SearchReactRepos($searchTerm: String!, $first: Int = 10) {
    search(query: $searchTerm, type: REPOSITORY, first: $first) {
      edges {
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
    }
  }
`;
