import { Response } from 'express';
import { generateAccessToken, generateRefreshToken, getRefreshCookieExp, LoginResponse } from 'server/utils/jwtUtils';
import { CookieOptions } from 'express-serve-static-core';

export function setTokenCookies(res: Response, loginResponse: LoginResponse, keep: boolean) {
  const refreshToken = generateRefreshToken(loginResponse.token.tokenId, loginResponse.token.exp, keep);
  const accessToken = generateAccessToken(loginResponse.token.tokenId);

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
  });
  const refreshTokenOption: CookieOptions = keep
    ? { httpOnly: true, expires: getRefreshCookieExp() }
    : { httpOnly: true };
  res.cookie('refreshToken', refreshToken, refreshTokenOption);
}
