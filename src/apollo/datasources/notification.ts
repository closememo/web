import AbstractApi from 'apollo/datasources/abstractApi';

class NotificationAPI extends AbstractApi {

  public async getCurrentNotification() {
    return await this.get('/query/client/current-notification');
  }
}

export default NotificationAPI;
