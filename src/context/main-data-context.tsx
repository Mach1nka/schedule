import * as React from "react";
import MainDataService from "../services/main-data-services";
import MainDataApi from "../api/main-data-api";
import MainDataServiceStorage from "../services/main-data-service-storage";

let storage;

try {
  storage = window.localStorage;
} catch (e) {
  storage = null;
}

export const mainData = new MainDataService({api: new MainDataApi(), storage: new MainDataServiceStorage({storage, baseKey: `MainData`, userDataKey: `MainDataUserData`})});
export const MainDataContext = React.createContext(mainData);
