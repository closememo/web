import PersonalLocalCache from 'client/cache/PersonalLocalCache';

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;

export interface ReadNotification {
  id: string;
  exp: number;
}

class ReadNotificationIdCache {

  private static async getReadNotifications(): Promise<ReadNotification[]> {
    let readNotifications: ReadNotification[] | null = await PersonalLocalCache.getReadNotifications();
    if (!readNotifications) {
      readNotifications = [];
    } else {
      readNotifications = readNotifications.filter(readNotification => Date.now() < readNotification.exp);
    }
    return readNotifications;
  }

  public static async addReadNotificationId(notificationId: string) {
    let readNotifications: ReadNotification[] = await ReadNotificationIdCache.getReadNotifications();
    readNotifications.push({
      id: notificationId,
      exp: Date.now() + ONE_MONTH,
    });
    await PersonalLocalCache.setReadNotifications(readNotifications);
  }

  public static async isNotificationHidden(notificationId: string): Promise<boolean> {
    const readNotifications: ReadNotification[] = await ReadNotificationIdCache.getReadNotifications();
    return readNotifications.some(readNotification => readNotification.id === notificationId);
  }
}

export default ReadNotificationIdCache;
