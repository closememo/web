import { Request, Response, Router } from 'express';
import axios from 'axios';
import { LoginResponse } from 'server/utils/jwtUtils';
import { setTokenCookies } from 'server/utils/tokenUtils';
import ErrorTypes from 'client/constants/ErrorTypes';
import States from 'client/constants/States';

interface ErrorResponse {
  error: {
    type: string,
    message: string | null;
  }
}

const tempLogin = Router();

const instance = axios.create({
  baseURL: process.env.API_SERVER,
  timeout: 5000,
});

tempLogin.get('/login-temp-account', async (req: Request, res: Response) => {
  const keep: boolean = (req.query.keep as string === 'true');
  const push: boolean = (req.query.push as string === 'true');
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  try {
    const response = await instance.post('/command/client/login-temp-account', { ip });
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

export default tempLogin;
