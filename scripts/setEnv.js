const { DefaultTokenKey, NodeEnv, ApiServer, ProductionEnv } = require('../config/env.json');

function setEnv({ isDev }) {
  const [, scriptPath, production, tokenKeyArg] = process.argv;

  const productionEnv =
    ProductionEnv[production] ||
    process.env.PRODUCTION_ENV ||
    ProductionEnv['dev'];

  const tokenKey =
    tokenKeyArg ||
    process.env.TOKEN_KEY ||
    DefaultTokenKey;

  const [, scriptName] = scriptPath.match(/(\w+)\.js/i);

  console.log(`[ 실행 명령어] npm run ${scriptName} ${productionEnv} ${tokenKey}`);

  process.env.NODE_ENV = isDev ? NodeEnv['development'] : NodeEnv['production'];
  process.env.PRODUCTION_ENV = productionEnv;
  process.env.API_SERVER = isDev ? ApiServer['dev'] : ApiServer['real'];
  process.env.TOKEN_KEY = tokenKey;

  console.log('[ 적용된 환경 변수 ]');
  console.log(`- process.env.NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`- process.env.PRODUCTION_ENV: ${process.env.PRODUCTION_ENV}`);
  console.log(`- process.env.API_SERVER: ${process.env.API_SERVER}`);
  console.log(`- process.env.TOKEN_KEY: ${process.env.TOKEN_KEY}`);

  return { productionEnv };
}

module.exports = setEnv;
