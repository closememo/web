import { Request, Response, Router } from 'express';
import axios from 'axios';
import {
  generateAccessToken,
  generateRefreshToken,
  getRefreshCookieExp,
  getRefreshTokenId,
  LoginResponse,
} from 'server/utils/jwtUtils';
import States from 'client/constants/States';
import ErrorTypes from 'client/constants/ErrorTypes';
import { CookieOptions } from 'express-serve-static-core';

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
    await instance.post('/command/client/register-naver-account', { code, state });
  } catch (error) {
    console.log(error);
  }

  return res.redirect('/?state=' + States.JUST_REGISTERED);
});

naverCallback.get('/login-callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const state = req.query.state as string;
  const keep: boolean = (req.query.keep as string === 'true');
  const push: boolean = (req.query.push as string === 'true');

  try {
    const response = await instance.post('/command/client/login-naver-account', { code, state });
    const loginResponse: LoginResponse = response.data as LoginResponse;

    setTokenCookies(res, loginResponse, keep);
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

  if (push) {
    return res.redirect('/?state=' + States.LOCAL_PUSH);
  } else {
    return res.redirect('/');
  }
});

function setTokenCookies(res: Response, loginResponse: LoginResponse, keep: boolean) {
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

naverCallback.get('/logout', async (req: Request, res: Response) => {
  const { refreshToken = '' }: { refreshToken: string } = req.cookies;

  const { refreshTokenId } = getRefreshTokenId(refreshToken);

  try {
    await instance.post('/command/client/logout', {
      tokenId: refreshTokenId,
    }, {
      headers: { 'X-ACCESS-TOKEN': refreshTokenId },
    });
  } catch (error) {
    console.log(error);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  return res.redirect('/');
});

naverCallback.get('/withdraw', async (req: Request, res: Response) => {
  const { refreshToken = '' }: { refreshToken: string } = req.cookies;

  const { refreshTokenId } = getRefreshTokenId(refreshToken);

  try {
    await instance.post('/command/client/withdraw', {
      tokenId: refreshTokenId,
    }, {
      headers: { 'X-ACCESS-TOKEN': refreshTokenId },
    });
  } catch (error) {
    console.log(error);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  return res.redirect('/');
});

export default naverCallback;
