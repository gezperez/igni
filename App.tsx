import React from 'react';
import config from './src/config';
import {
  ApolloClient,
  createHttpLink,
  DefaultOptions,
  gql,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {View} from 'react-native';

const defaultOptions: DefaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

const App = () => {
  const httpLink = createHttpLink({
    uri: config.apiBaseUrl,
  });

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    defaultOptions,
  });

  client
    .query({
      query: gql`
        query books {
          books {
            title
          }
        }
      `,
    })
    .then(result => console.log(result));

  return <View />;
};

export default App;
