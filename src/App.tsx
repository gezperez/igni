import React from 'react'
import { ApolloClient, ApolloProvider, createHttpLink, DefaultOptions, from, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { observer } from 'mobx-react-lite'

import config from '~/config'
import Navigator from '~/navigation/Navigator'
import { useStore } from './store'

const defaultOptions: DefaultOptions = {}

const App = () => {
  const { authStore } = useStore()

  const httpLink = createHttpLink({
    uri: config.apiBaseUrl,
  })

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: authStore.accessToken ? `Bearer ${authStore.accessToken}` : '',
      },
    }
  })

  const client = new ApolloClient({
    link: from([authLink, httpLink]),
    cache: new InMemoryCache(),
    defaultOptions,
  })

  return (
    <ApolloProvider client={client}>
      <Navigator />
    </ApolloProvider>
  )
}

export default observer(App)
