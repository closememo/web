import { Request, Response, Router } from 'express';
import axios from 'axios';
import {
  getRefreshTokenId,
  LoginResponse,
} from 'server/utils/jwtUtils';
import States from 'client/constants/States';
import ErrorTypes from 'client/constants/ErrorTypes';
import { setTokenCookies } from 'server/utils/tokenUtils';

interface ErrorResponse {
  error: {
    type: string,
    message: string | null;
  }
}

const naverCallback = Router();

const instance = axios.create({
  baseURL: process.env.API_SERVER,
  timeout: 10000,
});

// TODO: 사용되지 않음 제거할 것.
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

naverCallback.get('/logout', async (req: Request, res: Response) => {
  const { refreshToken = '' }: { refreshToken: string } = req.cookies;

  const { refreshTokenId } = getRefreshTokenId(refreshToken);

  try {
    await instance.post('/command/client/logout', {
      tokenId: refreshTokenId,
    }, {
      headers: {
        'X-ACCESS-TOKEN': refreshTokenId,
        'X-USER-IP': req.ip,
      },
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
      headers: {
        'X-ACCESS-TOKEN': refreshTokenId,
        'X-USER-IP': req.ip,
      },
    });
  } catch (error) {
    console.log(error);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('accessToken');

  return res.redirect('/');
});

export default naverCallback;
