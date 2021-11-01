import { ApolloProvider } from '@apollo/client';
import { loadableReady } from '@loadable/component';
import React from 'react';
import { hydrate } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';
import createApolloClient from 'apollo/createApolloClient';
import App from 'client/App';

loadableReady(async () => {
  hydrate(
    <BrowserRouter>
      <HelmetProvider>
        <ApolloProvider client={createApolloClient()}>
          <App />
        </ApolloProvider>
      </HelmetProvider>
    </BrowserRouter>,
    document.getElementById('root'),
  );
}).then(() => {
  // do nothing.
});
