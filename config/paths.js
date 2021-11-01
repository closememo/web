const fs = require('fs');
const path = require('path');

const root = fs.realpathSync(process.cwd());

function getDir(relativePath) {
  return path.resolve(root, relativePath);
}

function getPaths() {
  const paths = {
    base: getDir(''),
    src: getDir('src'),
    buildPath: getDir('dist'),
    buildStaticPath: getDir('dist/static'),
    publicPath: '/',
    publicStaticPath: '/static',
    stats: 'loadable-stats.json',
  };

  const sourceDirs = fs.readdirSync(paths.src);
  const alias = sourceDirs.reduce((r, dir) => {
    r[dir] = getDir(`src/${dir}`);
    return r;
  }, {
    'public': getDir('public'),
  });

  return {
    ...paths,
    alias,
  };
}

module.exports = getPaths();
