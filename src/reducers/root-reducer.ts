import {systemSlice} from "../slices/system-slice/system-slice";
import { getRtkSlice, ReduxStateEntities } from "./reducers-config";

export const rtkSlices = {
  system: systemSlice,
};

export const reducer = {
  systemState: rtkSlices.system.reducer,
};
