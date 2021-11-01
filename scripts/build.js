const webpack = require('webpack');
const clean = require('./clean');
const setEnv = require('./setEnv');

clean();
setEnv({ isDev: false });

const compiler = webpack(require('../config/webpack'));

compiler.run((err, stats) => {
  if (err) {
    console.log(err.stack);
    process.exit(1);
  }

  if (stats.hasErrors()) {
    const info = stats.toJson();
    info.errors.forEach((err) => console.log(err));
    process.exit(1);
  }

  ((stats && stats.stats) || []).map((stat) => {
    process.stdout.write(stat.toString());
  });
});
