import React, { Component } from 'react';
import MoviesTable from './components/MoviesTable/MoviesTable';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
          <MoviesTable />
      </ApolloProvider>
    );
  }
}

export default App;
