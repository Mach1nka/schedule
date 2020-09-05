import {systemSlice} from "../slices/system-slice/system-slice";
import {getRtkSlice, ReduxStateEntities} from "./reducers-config";

const scheduleEventsReducerData = {
  name: ReduxStateEntities.SCHEDULE_EVENTS,
  initialState: {
    data: [],
  }
};

export const rtkSlices = {
  system: systemSlice,
  scheduleEvents: getRtkSlice(scheduleEventsReducerData),
};

export const reducer = {
  systemState: rtkSlices.system.reducer,
  scheduleEvents: rtkSlices.scheduleEvents.reducer,
};
