import {UserSuccessSignInParse} from "../types/user-settings-types";

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

  getUserData = (): (UserSuccessSignInParse | null) => {
    if (this._storage) {
      try {
        return JSON.parse(this._storage.getItem(this._userDataKeyKey) as string);
      } catch (err) {
        throw new Error(`Storage error: ${err}`);
      }
    }

    return null;
  };
}
