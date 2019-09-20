import { gql } from 'apollo-boost';

export const dogsQuery = gql`
  query dogsQuery {
    dog {
      name,
      id
    }
  }
`;
