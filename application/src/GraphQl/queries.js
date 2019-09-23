import { gql } from 'apollo-boost';

export const MovieTitleQuery = gql`
  query MovieTitleQuery($serchName: String) {
    movies(name: $serchName) {
      name,
      id,
      isWatched
    }
  }
`;
