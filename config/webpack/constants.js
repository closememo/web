const { NodeEnv } = require('../env.json');

const isLocal = process.env.NODE_ENV === NodeEnv['development'];

module.exports = {
  isLocal,
};
