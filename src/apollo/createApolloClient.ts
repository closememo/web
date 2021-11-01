import 'isomorphic-fetch';
import { Request } from 'express';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

function createApolloClient() {
  const apolloState = window.__APOLLO_STATE__;

  delete window.__APOLLO_STATE__;

  return new ApolloClient({
    link: createHttpLink({
      uri: '/graphql',
    }),
    cache: apolloState ? new InMemoryCache().restore(apolloState) : new InMemoryCache(),
  });
}

export function createApolloSSRClient(request: Request) {
  return new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    link: createHttpLink({
      uri: 'http://localhost:3000/graphql',
      credentials: 'same-origin',
      headers: request.headers,
    }),
  });
}

export default createApolloClient;
