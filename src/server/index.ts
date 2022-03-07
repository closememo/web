import http from 'http';
import { isLocal } from 'shared/constants/env';
import createServer from './createServer';

async function getApp() {
  const App = await import('client/App');

  return App.default;
}

(async function() {
  const PORT = Number.parseInt(process.env.PORT_ENV || '3000');
  const HOST = 'localhost';

  const app = await createServer(await getApp());
  const server = http.createServer(app);

  server.listen(PORT, '0.0.0.0', 511, () => {
    console.log(`App is running: http://${HOST}:${PORT}`);
  });

  isLocal &&
  process.on('uncaughtException', error => {
    console.log(`[Inside 'uncaughtException' event] ${error.stack}` || error.message);
  });
})();
