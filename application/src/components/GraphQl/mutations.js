import { gql } from 'apollo-boost';

export const addMovieTitle = gql`
  mutation addMovieTitle($name: String, $isWatched: Boolean) {
    addMovie(name: $name, isWatched: $isWatched) {
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
  mutation updateMovieTitle($nameId: String, $name: String ,$isWatched: Boolean) {
    updateMovie(id: $nameId ,name: $name, isWatched: $isWatched) {
      name
    }
  }
`;
