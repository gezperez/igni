import React from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  DefaultOptions,
  gql,
  InMemoryCache,
} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {View} from 'react-native';

import config from '~/config';

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

  return (
    <ApolloProvider client={client}>
      <View />
    </ApolloProvider>
  );
};

export default App;
