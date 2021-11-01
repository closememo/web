const { NodeEnv } = require('../../../config/env.json');

export const isLocal = process.env.NODE_ENV === NodeEnv.development;
