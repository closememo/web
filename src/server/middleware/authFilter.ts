import { NextFunction, Request, Response } from 'express';
import {
  generateAccessToken,
  generateRefreshToken,
  generateSyncToken,
  getAccessTokenId,
  getRefreshCookieExp,
  getRefreshTokenId,
  getSyncCookieMaxAge,
  getSyncTokenId,
  LoginResponse,
} from 'server/utils/jwtUtils';
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.API_SERVER,
});

async function authFilter(req: Request, res: Response, next: NextFunction) {
  const {
    accessToken = '',
    refreshToken = '',
    syncToken = '',
  }: { accessToken: string, refreshToken: string, syncToken: string } = req.cookies;

  const refreshTokenId = getRefreshTokenId(refreshToken);
  const accessTokenId = getAccessTokenId(accessToken, refreshTokenId);
  const syncTokenId = getSyncTokenId(syncToken);

  if (accessTokenId) {
    res.locals.token = refreshTokenId;
    res.locals.sync = syncTokenId;
  } else if (refreshTokenId) {
    try {
      const response = await instance.post('/command/client/reissue-token', {
        tokenId: refreshTokenId,
      }, {
        headers: { 'X-ACCESS-TOKEN': refreshTokenId, 'X-SYNC-TOKEN': syncTokenId },
      });

      const loginResponse: LoginResponse = response.data as LoginResponse;

      const refreshToken = generateRefreshToken(loginResponse.token.tokenId, loginResponse.token.exp);
      const accessToken = generateAccessToken(loginResponse.token.tokenId);
      const syncToken = generateSyncToken(refreshTokenId);

      res.cookie('refreshToken', refreshToken, {
        expires: getRefreshCookieExp(),
        httpOnly: true,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });
      res.cookie('syncToken', syncToken, {
        maxAge: getSyncCookieMaxAge(),
        httpOnly: true,
      });

      res.locals.token = loginResponse.token.tokenId;
      res.locals.sync = refreshTokenId;
    } catch (error) {

      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');
      res.clearCookie('syncToken');

      console.log('[ERROR] reissue token failed.\n' +
        'URL= ' + req.protocol + '://' + req.get('host') + req.originalUrl + '\n' +
        'accessTokenId=' + accessTokenId + ', refreshTokenId=' + refreshTokenId);
    }
  }

  next();
}

export default authFilter;
