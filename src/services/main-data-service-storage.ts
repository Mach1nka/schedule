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
}
