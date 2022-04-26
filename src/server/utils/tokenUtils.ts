import { Response } from 'express';
import { generateAccessToken, generateRefreshToken, getRefreshCookieExp, LoginResponse } from 'server/utils/jwtUtils';
import { CookieOptions } from 'express-serve-static-core';

/**
 * 로그인 처리를 위한 정보를 쿠키에 담는다.
 */
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
