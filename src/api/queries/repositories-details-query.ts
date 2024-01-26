import { gql } from '@apollo/client';

export const REPOSITORIES_DETAILS_QUERY = gql`
  query SearchReactRepos {
    search(query: "react in:name", type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            id
            url
          }
        }
      }
    }
  }
`;
