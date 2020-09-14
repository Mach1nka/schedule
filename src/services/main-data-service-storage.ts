import {UserSettings} from "../types/user-settings-types";

interface MainDataServiceStorageProps {
  storage: Storage | null;
  baseKey: string;
  userDataKey: string;
}

export default class MainDataServiceStorage {
  private readonly _storage: Storage | null;
  private readonly _baseKey: string;
  private readonly _userDataKeyKey: string;

  constructor(props: MainDataServiceStorageProps) {
    this._storage = props.storage;
    this._baseKey = props.baseKey;
    this._userDataKeyKey = `${this._baseKey}UserData`;
  }

  setUserData = (data) => {
    if (this._storage) {
      try {
        const currentStorageData = JSON.parse(this._storage.getItem(this._userDataKeyKey) as string);
        const newStorageData = {
          ...currentStorageData,
          ...data,
        }

        this._storage.setItem(this._userDataKeyKey, JSON.stringify(newStorageData));

        return newStorageData;
      } catch (err) {
        throw new Error(`Storage error: ${err}`);
      }
    }
  }

  getUserData = (data): UserSettings | null => {
    if (this._storage) {
      try {
        const currentStorageData = this._storage.getItem(this._userDataKeyKey);
        return currentStorageData
          ? {
            ...data,
            ...JSON.parse(currentStorageData),
          }
          : {...data};
      } catch (err) {
        throw new Error(`Storage error: ${err}`);
      }
    }

    return null;
  };
}
