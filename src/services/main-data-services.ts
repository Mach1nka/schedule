import MainDataApi from "../api/main-data-api";
import MainDataServiceStorage from "./main-data-service-storage";
import {ParsedResponse} from "../types/types";
import {apiScheduleBackPath, apiScheduleTypeEventsBackPath} from "../data/paths";
import MainDataAdapter from "./main-data-adapter";
import {UserSettings} from "../types/user-settings-types";

interface MainDataServicesProps {
  api: MainDataApi;
  storage: MainDataServiceStorage;
}

export default class MainDataService {
  private _api: MainDataApi;
  private readonly _storage: MainDataServiceStorage;

  constructor(props: MainDataServicesProps) {
    this._api = props.api;
    this._storage = props.storage;
  }

  getToken = (): string => {
    let token = ``;
    if (this._storage && this._storage.getUserData({})) {
      token = this._storage.getUserData({})?.apiToken || ``;
    }

    return token;
  };

  _getScheduleEntity = <R>(props: {url: string; parseResponse: (data: any) => any; dataToBack?: any;}): Promise<ParsedResponse<R>> => {
    const {
      url,
      parseResponse,
      dataToBack = null,
    } = props;

    const token = this.getToken();

    return this._api.getScheduleEntity({url, token, data: dataToBack})
      .then((response) => {
        return {
          status: response.status,
          message: response.data.message,
          data: response.data.data && (typeof parseResponse === `function` ? parseResponse(response.data.data) : response.data.data),
          errors: response.data.errors,
        };
      });
  };

  _postScheduleEntity = <R>(props: {dataToBack: any; url: string; parseResponse?: (data: any) => any}): Promise<ParsedResponse<R>> => {
    const {
      dataToBack,
      url,
      parseResponse,
    } = props;

    const token = this.getToken();

    return this._api.postScheduleEntity({url, token, data: dataToBack})
      .then((response) => {
        return {
          status: response.status,
          message: response.data.message,
          data: (response.data.data || response.data) && (typeof parseResponse === `function` ? parseResponse(response.data.data || response.data) : (response.data.data || response.data)),
          errors: response.data.errors,
        };
      });
  };

  _putScheduleEntity = <R>(props: {dataToBack: any; url: string; parseResponse?: (data: any) => any}): Promise<ParsedResponse<R>> => {
    const {
      dataToBack,
      url,
      parseResponse,
    } = props;

    const token = this.getToken();

    return this._api.putScheduleEntity({url, token, data: dataToBack})
      .then((response) => {
        return {
          status: response.status,
          message: response.data.message,
          data: (response.data.data || response.data) && (typeof parseResponse === `function` ? parseResponse(response.data.data || response.data) : (response.data.data || response.data)),
          errors: response.data.errors,
        };
      });
  };

  _removeScheduleEntity = <R>(props: {url: string; parseResponse?: (data: any) => any}): Promise<ParsedResponse<R>> => {
    const {
      url,
      parseResponse,
    } = props;

    const token = this.getToken();

    return this._api.removeScheduleEntity({url, token})
      .then((response) => {
        return {
          status: response.status,
          message: response.data.message,
          data: (response.data.data || response.data) && (typeof parseResponse === `function` ? parseResponse(response.data.data || response.data) : (response.data.data || response.data)),
          errors: response.data.errors,
        };
      });
  };

  setUserSettings = (data): Promise<{}> => {
    return Promise.resolve(this._storage.setUserData(data));
  };

  getUserSettings = (data): Promise<ParsedResponse<UserSettings | null>> => {
    return Promise.resolve({
      status: 200,
      data: this._storage.getUserData(data)
    });
  };

  getScheduleEvents = (): Promise<ParsedResponse<any[]>> => {
    const url = `${apiScheduleBackPath.HOST}/${apiScheduleBackPath.EVENTS}`;
    const parseResponse = MainDataAdapter.getScheduleEvents;
    return this._getScheduleEntity({url, parseResponse});
  };

  postScheduleEvent = (dataToBack): Promise<ParsedResponse<any[]>> => {
    const url = `${apiScheduleBackPath.HOST}/${apiScheduleBackPath.EVENT}/`;
    return this._postScheduleEntity({dataToBack, url});
  };

  putScheduleEvent = (id: string)=>(dataToBack): Promise<ParsedResponse<any[]>> => {
    const url = `${apiScheduleBackPath.HOST}/${apiScheduleBackPath.EVENT}/${id}`;
    return this._putScheduleEntity({dataToBack, url});
  };

  removeScheduleEvent = (id: string)=>(): Promise<ParsedResponse<any[]>> => {
    const url = `${apiScheduleBackPath.HOST}/${apiScheduleBackPath.EVENT}/${id}`;
    return this._removeScheduleEntity({url});
  };


  getScheduleTypesEvents = (): Promise<ParsedResponse<any[]>> => {
    const url = `${apiScheduleTypeEventsBackPath.HOST}/${apiScheduleTypeEventsBackPath.TYPES_EVENTS}`;
    const parseResponse = MainDataAdapter.getScheduleEvents;
    return this._getScheduleEntity({url, parseResponse});
  };

  postScheduleTypeEvent = (dataToBack): Promise<ParsedResponse<any[]>> => {
    const url = `${apiScheduleTypeEventsBackPath.HOST}/${apiScheduleTypeEventsBackPath.TYPE_EVENT}/`;
    return this._postScheduleEntity({dataToBack, url});
  };

  putScheduleTypeEvent = (id: string)=>(dataToBack): Promise<ParsedResponse<any[]>> => {
    const url = `${apiScheduleTypeEventsBackPath.HOST}/${apiScheduleTypeEventsBackPath.TYPE_EVENT}/${id}`;
    return this._putScheduleEntity({dataToBack, url});
  };
}
