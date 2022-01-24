import { NextFunction, Request, Response } from 'express';
import {
  generateAccessToken,
  generateRefreshToken,
  getAccessTokenId,
  getRefreshCookieExp,
  getRefreshTokenId,
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

      const refreshToken = generateRefreshToken(loginResponse.token.tokenId, loginResponse.token.exp, keep);
      const accessToken = generateAccessToken(loginResponse.token.tokenId);

      res.cookie('refreshToken', refreshToken, {
        expires: getRefreshCookieExp(),
        httpOnly: true,
      });
      res.cookie('accessToken', accessToken, {
        httpOnly: true,
      });

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
