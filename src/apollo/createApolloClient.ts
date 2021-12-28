import 'isomorphic-fetch';
import { Request } from 'express';
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { currentCategoryVar } from 'apollo/caches';

function createApolloClient() {
  const apolloState = window.__APOLLO_STATE__;

  delete window.__APOLLO_STATE__;

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          currentCategory: {
            read() {
              return currentCategoryVar();
            },
          },
        },
      },
    },
  });

  return new ApolloClient({
    link: createHttpLink({
      uri: '/graphql',
    }),
    cache: apolloState ? cache.restore(apolloState) : cache,
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
