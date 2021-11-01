import * as path from 'path';
import { ApolloProvider } from '@apollo/client';
import { renderToStringWithData } from '@apollo/client/react/ssr';
import { ChunkExtractor } from '@loadable/server';
import { NextFunction, Response, Request, RequestHandler } from 'express';
import React from 'react';
import { HelmetData, HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom';
import { createApolloSSRClient } from 'apollo/createApolloClient';
import createHtml from '../components/createHtml';

function getExtractor() {
  const statsFile = path.resolve('./dist/static/loadable-stats.json');
  return new ChunkExtractor({ statsFile });
}

function wrap(asyncFn: Function) {
  return (async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  });
}

function renderHtml({ App }: { App: () => JSX.Element }): RequestHandler {
  return wrap(async (req: Request, res: Response, next: NextFunction) => {
    const client = createApolloSSRClient(req);
    const helmetContext = { helmet: {} as HelmetData };

    const ServerApp = (
      <StaticRouter location={req.url}>
        <HelmetProvider context={helmetContext}>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </HelmetProvider>
      </StaticRouter>
    );

    const extractor = getExtractor();
    const app = extractor.collectChunks(ServerApp);

    try {
      const content = await renderToStringWithData(app);

      const { helmet } = helmetContext;
      const html = createHtml({
        content,
        extractor,
        apolloState: client.extract(),
        helmetData: helmet,
      });

      res.on('error', (error: Error) => {
        console.log(`html stream Error ${error.stack}`);
        next(error);
      });

      res.type('html');
      res.write('<!DOCTYPE html>');
      res.write(html);
      res.end();
    } catch (error: any) {
      console.log(`[APOLLO renderToStringWithData ERROR] ${error.message}`);
      next(error);
    }
  });
}

export default renderHtml;
