import { NextFunction, Request, Response } from 'express';
import {
  getAccessTokenId,
  getRefreshTokenId,
  LoginResponse,
} from 'server/utils/jwtUtils';
import axios from 'axios';
import { setTokenCookies } from 'server/utils/tokenUtils';

const instance = axios.create({
  baseURL: process.env.API_SERVER,
});

async function authFilter(req: Request, res: Response, next: NextFunction) {
  const {
    accessToken = '',
    refreshToken = '',
  }: { accessToken: string, refreshToken: string } = req.cookies;

  const { refreshTokenId, keep } = getRefreshTokenId(refreshToken);
  const accessTokenId = getAccessTokenId(accessToken, refreshTokenId);

  if (accessTokenId) {
    res.locals.token = refreshTokenId;
  } else if (refreshTokenId) {
    try {
      const response = await instance.post('/command/client/reissue-token', {
        tokenId: refreshTokenId,
      }, {
        headers: { 'X-ACCESS-TOKEN': refreshTokenId },
      });

      const loginResponse: LoginResponse = response.data as LoginResponse;

      setTokenCookies(res, loginResponse, keep);

      res.locals.token = loginResponse.token.tokenId;
    } catch (error) {

      res.clearCookie('refreshToken');
      res.clearCookie('accessToken');

      console.log('[ERROR] reissue token failed.\n' +
        'URL= ' + req.protocol + '://' + req.get('host') + req.originalUrl + '\n' +
        'accessTokenId=' + accessTokenId + ', refreshTokenId=' + refreshTokenId);
    }
  }

  next();
}

export default authFilter;
