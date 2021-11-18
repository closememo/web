const { NodeEnv } = require('../../../config/env.json');

export const isLocal = process.env.NODE_ENV === NodeEnv.development;
export const host = process.env.HOST;
export const naverClientId = process.env.NAVER_CLIENT_ID;
