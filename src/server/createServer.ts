import path from 'path';
import express, { Express, Request, Response } from 'express';
import createApolloServer from 'apollo/createApolloServer';
import renderHtml from 'server/middleware/renderHtml';
import naverCallback from 'server/middleware/naverCallback';
import authFilter from 'server/middleware/authFilter';
import cookieParser from 'cookie-parser';
import tempLogin from 'server/middleware/tempLogin';

async function createServer(App: () => JSX.Element): Promise<Express> {
  const app = express();

  // health-check
  app.get('/health-check', (req: Request, res: Response) => {
    return res.status(200).end();
  });
  // static
  app.use('/static', express.static(path.join(__dirname, 'static')));
  // auth
  app.use(cookieParser());
  app.use('/', authFilter);
  app.use('/naver', naverCallback);
  app.use('/temp', tempLogin);
  // apollo
  const apolloServer = createApolloServer();
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  // react
  app.use(renderHtml({ App }));

  return app;
}

export default createServer;
