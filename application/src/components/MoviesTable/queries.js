import { gql } from 'apollo-boost';

export const MovieTitleQuery = gql`
  query MovieTitleQuery {
    movies {
      name,
      id
    }
  }
`;
