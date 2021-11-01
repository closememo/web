import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { getNowDateString } from 'shared/utils/dateUtils';

const TEN_SECONDS_BY_SECONDS = 10;
const FIVE_MINUTES_BY_SECONDS = 5 * 60;
const TEN_SECONDS_BY_MILLISECONDS = 1000 * 10;
const ONE_MONTH_BY_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

const TOKEN_KEY: string = process.env.TOKEN_KEY || 'tokenKey';
const SECRET_PREFIX: string = process.env.SECRET_PREFIX || 'prefix';

export interface LoginResponse {
  accountId: {
    id: string
  },
  token: {
    tokenId: string,
    exp: number
  }
}

export function generateRefreshToken(tokenId: string, exp: number): string {
  const bytes = CryptoJS.AES.encrypt(tokenId, SECRET_PREFIX);

  return jwt.sign({
    id: bytes.toString(),
    exp: exp,
  }, getRefreshTokenKey());
}

export function generateAccessToken(tokenId: string): string {
  const dummy = getNowDateString();

  return jwt.sign({
    id: dummy,
    exp: getAccessTokenExp(),
  }, getAccessTokenKey(tokenId));
}

export function generateSyncToken(refreshTokenId: string): string {
  const bytes = CryptoJS.AES.encrypt(refreshTokenId, SECRET_PREFIX);

  return jwt.sign({
    id: bytes.toString(),
    exp: getSyncTokenExp(),
  }, getSyncTokenKey());
}

export function getRefreshTokenId(refreshToken: string): string {
  if (!refreshToken) {
    return '';
  }

  try {
    const refreshTokenDecoded = jwt.verify(refreshToken, getRefreshTokenKey()) as JwtPayload;
    return CryptoJS.AES.decrypt(refreshTokenDecoded.id, SECRET_PREFIX).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.log(error.message);
    }
    return '';
  }
}

export function getAccessTokenId(accessToken: string, tokenId: string): string {
  if (!accessToken) {
    return '';
  }

  try {
    const accessTokenDecoded = jwt.verify(accessToken, getAccessTokenKey(tokenId)) as JwtPayload;
    return accessTokenDecoded.id;
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.log(error.message);
    }
    return '';
  }
}

export function getSyncTokenId(syncToken: string): string {
  if (!syncToken) {
    return '';
  }

  try {
    const syncTokenDecoded = jwt.verify(syncToken, getSyncTokenKey()) as JwtPayload;
    return CryptoJS.AES.decrypt(syncTokenDecoded.id, SECRET_PREFIX).toString(CryptoJS.enc.Utf8);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      console.log(error.message);
    }
    return '';
  }
}

export function getRefreshCookieExp(): Date {
  return new Date(Date.now() + ONE_MONTH_BY_MILLISECONDS);
}

export function getSyncCookieMaxAge(): number {
  return TEN_SECONDS_BY_MILLISECONDS;
}

function getAccessTokenExp(): number {
  return Math.floor(Date.now() / 1000) + FIVE_MINUTES_BY_SECONDS;
}

function getSyncTokenExp(): number {
  return Math.floor(Date.now() / 1000) + TEN_SECONDS_BY_SECONDS;
}

function getRefreshTokenKey(): string {
  return TOKEN_KEY;
}

function getAccessTokenKey(id: string): string {
  return TOKEN_KEY + ':' + id;
}

function getSyncTokenKey(): string {
  return TOKEN_KEY;
}
