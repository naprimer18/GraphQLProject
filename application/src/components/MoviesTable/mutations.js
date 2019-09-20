import { gql } from 'apollo-boost';

export const addDog = gql`
  mutation addDog($name: String) {
    addDog(name: $name) {
      name
    }
  }
`;

export const deleteDog = gql`
  mutation deleteDog($id: String) {
    deleteDog(id: $id) {
      id
    }
  }
`;

export const updateDog = gql`
  mutation updateDog($renameId: String, $rename: String) {
    updateDog(id: $renameId ,name: $rename) {
      name
    }
  }
`;
