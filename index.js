import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {ApolloClient, InMemoryCache} from '@apollo/client';
import {gql} from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3000/api',
  cache: new InMemoryCache(),
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

AppRegistry.registerComponent(appName, () => App);
