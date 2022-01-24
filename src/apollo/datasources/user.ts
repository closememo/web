import { ApolloError } from '@apollo/client';
import AbstractApi from 'apollo/datasources/abstractApi';

class UserAPI extends AbstractApi {

  public async getLoggedInUser(): Promise<{ isLoggedIn: boolean }> {
    if (!this.context.accessToken) {
      return { isLoggedIn: false };
    }

    try {
      const response = await this.get('/query/client/accounts/me');
      return response ? response : { isLoggedIn: false };
    } catch (error) {
      if (error instanceof ApolloError) {
        console.log('[ERROR] ApolloError: login check failed.\n' +
          'URL= ' + this.baseURL + '/query/client/accounts/me\n' +
          'accessToken=' + this.context.accessToken);
      }
      return { isLoggedIn: false };
    }
  }
}

export default UserAPI;
