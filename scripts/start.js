const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const paths = require('../config/paths');
const clean = require('./clean');
const setEnv = require('./setEnv');

clean();
setEnv({ isDev: true });

const compiler = webpack(require('../config/webpack'));

const webpackDevMiddleware = middleware(compiler, {
  stats: {
    colors: true,
  },
  serverSideRender: true,
  writeToDisk: true,
});

webpackDevMiddleware.waitUntilValid(() => {
  try {
    const spawn = require('child_process').spawn;
    const child = spawn('node', [`${paths.buildPath}/server.js`]);

    child.stdout.on('data', data => {
      console.log(`${data}`);
    });

    child.stderr.on('data', err => {
      console.log(err);
    });

    process.on('exit', () => child.kill());
  } catch (err) {
    console.log(err);
  }
});
