import { Request, Response, Router } from 'express';
import axios from 'axios';
import {
  generateAccessToken,
  generateRefreshToken,
  generateSyncToken,
  getRefreshCookieExp,
  getRefreshTokenId,
  getSyncCookieMaxAge,
  getSyncTokenId,
  LoginResponse,
} from 'server/utils/jwtUtils';

const naverCallback = Router();

const instance = axios.create({
  baseURL: process.env.API_SERVER,
});

naverCallback.get('/register-callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  await naverLogin(code, state, res, true);

  return res.redirect('/');
});

naverCallback.get('/login-callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  await naverLogin(code, state, res, false);

  return res.redirect('/');
});

async function naverLogin(code: string, state: string, res: Response, isRegister: boolean) {
  const path = isRegister
    ? '/command/client/register-naver-account'
    : '/command/client/login-naver-account';

  try {
    const response = await instance.post(path, { code, state });
    const loginResponse: LoginResponse = response.data as LoginResponse;

    const refreshToken = generateRefreshToken(loginResponse.token.tokenId, loginResponse.token.exp);
    const accessToken = generateAccessToken(loginResponse.token.tokenId);
    const syncToken = generateSyncToken(loginResponse.accountId.id);

    setCookies(res, refreshToken, accessToken, syncToken);
  } catch (error) {
    console.log(error);
  }
}

function setCookies(res: Response, refreshToken: string, accessToken: string, syncToken: string) {
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
  });
  res.cookie('refreshToken', refreshToken, {
    expires: getRefreshCookieExp(),
    httpOnly: true,
  });
  res.cookie('syncToken', syncToken, {
    maxAge: getSyncCookieMaxAge(),
    httpOnly: true,
  });
}

naverCallback.get('/logout', async (req: Request, res: Response) => {
  const {
    refreshToken = '',
    syncToken = '',
  }: { refreshToken: string, syncToken: string } = req.cookies;

  const refreshTokenId = getRefreshTokenId(refreshToken);
  const syncTokenId = getSyncTokenId(syncToken);

  try {
    await instance.post('/command/client/logout', {
      tokenId: refreshTokenId,
    }, {
      headers: { 'X-ACCESS-TOKEN': refreshTokenId, 'X-SYNC-TOKEN': syncTokenId },
    });
  } catch (error) {
    console.log(error);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');
  res.clearCookie('syncToken');

  return res.redirect('/');
});

export default naverCallback;
