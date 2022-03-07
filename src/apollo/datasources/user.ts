import { ApolloError } from '@apollo/client';
import AbstractApi from 'apollo/datasources/abstractApi';

interface Me {
  id: string;
  isLoggedIn: boolean;
  isTempUser?: boolean;
  documentOrderType?: string;
  documentCount?: number;
}

class UserAPI extends AbstractApi {

  public async getLoggedInUser(): Promise<Me> {
    if (!this.context.accessToken) {
      return { id: 'ME', isLoggedIn: false };
    }

    try {
      const response = await this.get('/query/client/accounts/me');
      return response
        ? { id: 'ME', ...response }
        : { id: 'ME', isLoggedIn: false };
    } catch (error) {
      if (error instanceof ApolloError) {
        console.log('[ERROR] ApolloError: login check failed.\n' +
          'URL= ' + this.baseURL + '/query/client/accounts/me\n' +
          'accessToken=' + this.context.accessToken);
      }
      return { id: 'ME', isLoggedIn: false };
    }
  }

  public async updateAccountOption(documentOrderType: string, documentCount: number) {
    await this.post('/command/client/update-account-option', {
      documentOrderType,
      documentCount,
    });
    return true;
  }
}

export default UserAPI;
