import { gql } from 'apollo-boost';

export const addMovieTitle = gql`
  mutation addMovieTitle($name: String) {
    addMovie(name: $name) {
      name
    }
  }
`;

export const deleteMovieTitle = gql`
  mutation deleteMovieTitle($id: String) {
    deleteMovie(id: $id) {
      id
    }
  }
`;

export const updateMovieTitle = gql`
  mutation updateMovieTitle($renameId: String, $rename: String) {
    updateMovie(id: $renameId ,name: $rename) {
      name
    }
  }
`;
