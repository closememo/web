import * as localforage from 'localforage';
import { LocalPost } from 'client/components/local/LocalPage';
import { ReadNotification } from 'client/cache/ReadNotificationIdCache';

const LOCAL_POST_ID_LIST_KEY = 'postIds';
const KEEP_LOGIN_CHECKED_KEY = 'keepLoginChecked';
const LOCAL_MEMO_PUSH_CHECKED_KEY = 'localMemoPushChecked';
const ORDER_OPTION_OPEN_KEY = 'orderOptionOpen';
const FIRST_MEMO_VIEWED = 'firstMemoViewed';
const READ_NOTIFICATION_ID_LIST_KEY = 'readNotificationIds';

class PersonalLocalCache {

  // Local Post
  public static async setLocalPost(postId: string, post: LocalPost) {
    await localforage.setItem(postId, post);
  }

  public static async getLocalPost(postId: string): Promise<LocalPost | null> {
    return await localforage.getItem(postId) as LocalPost;
  }

  public static async removeLocalPost(postId: string) {
    await localforage.removeItem(postId);
  }

  // Local Post Ids
  public static async setLocalPostIds(postIds: string[]) {
    await localforage.setItem(LOCAL_POST_ID_LIST_KEY, postIds);
  }

  public static async getLocalPostIds(): Promise<string[] | null> {
    return await localforage.getItem(LOCAL_POST_ID_LIST_KEY);
  }

  public static async removeLocalPostIds() {
    await localforage.removeItem(LOCAL_POST_ID_LIST_KEY);
  }

  // keep login checked
  public static async setKeepLoginChecked(keepLoginChecked: boolean) {
    await localforage.setItem(KEEP_LOGIN_CHECKED_KEY, keepLoginChecked);
  }

  public static async getKeepLoginChecked(): Promise<boolean | null> {
    return await localforage.getItem(KEEP_LOGIN_CHECKED_KEY);
  }

  // local memo push checked
  public static async setLocalMemoPoshChecked(localMemoPushChecked: boolean) {
    await localforage.setItem(LOCAL_MEMO_PUSH_CHECKED_KEY, localMemoPushChecked);
  }

  public static async getLocalMemoPushChecked(): Promise<boolean | null> {
    return await localforage.getItem(LOCAL_MEMO_PUSH_CHECKED_KEY);
  }

  // order option open
  public static async setOrderOptionOpen(orderOptionOpen: boolean) {
    await localforage.setItem(ORDER_OPTION_OPEN_KEY, orderOptionOpen);
  }

  public static async getOrderOptionOpen(): Promise<boolean | null> {
    return await localforage.getItem(ORDER_OPTION_OPEN_KEY);
  }

  // first memo viewed
  public static async setFirstMemoViewed(firstMemoViewed: boolean) {
    await localforage.setItem(FIRST_MEMO_VIEWED, firstMemoViewed);
  }

  public static async getFirstMemoViewed(): Promise<boolean | null> {
    return await localforage.getItem(FIRST_MEMO_VIEWED);
  }

  // read notification id list
  public static async setReadNotifications(readNotifications: ReadNotification[]) {
    await localforage.setItem(READ_NOTIFICATION_ID_LIST_KEY, readNotifications);
  }

  public static async getReadNotifications(): Promise<ReadNotification[] | null> {
    return await localforage.getItem(READ_NOTIFICATION_ID_LIST_KEY);
  }
}

export default PersonalLocalCache;
