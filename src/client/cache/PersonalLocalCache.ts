import * as localforage from 'localforage';

const ORDER_TYPE_KEY = 'orderType';
const ORDER_OPTION_OPEN_KEY = 'orderOptionOpen';

class PersonalLocalCache {

  public static async setOrderOptionOpen(orderOptionOpen: boolean) {
    await localforage.setItem(ORDER_OPTION_OPEN_KEY, orderOptionOpen);
  }

  public static async getOrderOptionOpen(): Promise<boolean | null> {
    return await localforage.getItem(ORDER_OPTION_OPEN_KEY);
  }

  public static async setOrderType(orderType: string) {
    await localforage.setItem(ORDER_TYPE_KEY, orderType);
  }

  public static async getOrderType(): Promise<string | null> {
    return await localforage.getItem(ORDER_TYPE_KEY);
  }
}

export default PersonalLocalCache;
