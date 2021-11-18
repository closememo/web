const { DefaultApiServer, DefaultSecretPrefix, DefaultTokenKey, Host, NodeEnv } = require('../config/env.json');

function setEnv({ isDev }) {
  const [, scriptPath, tokenKeyArg, secretPrefixArg] = process.argv;

  const tokenKey =
    tokenKeyArg ||
    process.env.TOKEN_KEY ||
    DefaultTokenKey;

  const secretPrefix =
    secretPrefixArg ||
    process.env.SECRET_PREFIX ||
    DefaultSecretPrefix;

  const apiServer =
    process.env.API_SERVER ||
    DefaultApiServer;

  const [, scriptName] = scriptPath.match(/(\w+)\.js/i);

  console.log(`[ 실행 명령어] npm run ${scriptName} ${apiServer} ${tokenKey} ${secretPrefix}`);

  process.env.NODE_ENV = isDev ? NodeEnv['development'] : NodeEnv['production'];
  process.env.HOST = isDev ? Host['dev'] : Host['real'];
  process.env.API_SERVER = apiServer;
  process.env.TOKEN_KEY = tokenKey;
  process.env.SECRET_PREFIX = secretPrefix;

  console.log('[ 적용된 환경 변수 ]');
  console.log(`- process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`- process.env.HOST: ${process.env.HOST}`);
  console.log(`- process.env.API_SERVER: ${process.env.API_SERVER}`);
  console.log(`- process.env.TOKEN_KEY: ${process.env.TOKEN_KEY}`);
  console.log(`- process.env.SECRET_PREFIX: ${process.env.SECRET_PREFIX}`);
}

module.exports = setEnv;
