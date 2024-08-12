import { ApolloClient, createHttpLink, from, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import BaseConfiguration from '@/modules/base/core/BaseConfiguration'

const uri = BaseConfiguration.configurations.VUELDERJS_API_URL

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: `${uri}/graphql`,
})

// Cache implementation
const cache = new InMemoryCache()

const currencyMiddleware = setContext((_, { headers }) => {
  // get the authentication token from Session storage if it exists
  const token = localStorage.getItem('token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : "",
    }
  }

})

export const apolloClient = new ApolloClient({
  link: from([currencyMiddleware, httpLink]),
  cache,
})