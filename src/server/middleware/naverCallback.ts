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
import States from 'client/constants/States';
import ErrorTypes from 'client/constants/ErrorTypes';

interface ErrorResponse {
  error: {
    type: string,
    message: string | null;
  }
}

const naverCallback = Router();

const instance = axios.create({
  baseURL: process.env.API_SERVER,
});

naverCallback.get('/register-callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  try {
    const response = await instance.post('/command/client/register-naver-account', { code, state });
    const loginResponse: LoginResponse = response.data as LoginResponse;

    setTokenCookies(res, loginResponse);
  } catch (error) {
    console.log(error);
  }

  return res.redirect('/');
});

naverCallback.get('/login-callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;

  try {
    const response = await instance.post('/command/client/login-naver-account', { code, state });
    const loginResponse: LoginResponse = response.data as LoginResponse;

    setTokenCookies(res, loginResponse);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const data = error.response.data as ErrorResponse;
      switch (data.error.type) {
        case ErrorTypes.ACCOUNT_NOT_FOUND:
          return res.redirect('/?state=' + States.NEED_REGISTER);
      }
    } else {
      console.log(error);
    }
  }

  return res.redirect('/');
});

function setTokenCookies(res: Response, loginResponse: LoginResponse) {
  const refreshToken = generateRefreshToken(loginResponse.token.tokenId, loginResponse.token.exp);
  const accessToken = generateAccessToken(loginResponse.token.tokenId);
  const syncToken = generateSyncToken(loginResponse.accountId.id);

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

naverCallback.get('/withdraw', async (req: Request, res: Response) => {
  const {
    refreshToken = '',
    syncToken = '',
  }: { refreshToken: string, syncToken: string } = req.cookies;

  const refreshTokenId = getRefreshTokenId(refreshToken);
  const syncTokenId = getSyncTokenId(syncToken);

  try {
    await instance.post('/command/client/withdraw', {
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
