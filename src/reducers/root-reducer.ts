import {systemSlice} from "../slices/system-slice/system-slice";
import {getRtkSlice, ReduxStateEntities} from "./reducers-config";
import { ScheduleEventsState } from "../types/schedule-events-types";

const scheduleEventsReducerData = {
  name: ReduxStateEntities.SCHEDULE_EVENTS,
  initialState: {
    data: null,
  } as ScheduleEventsState
};

export const userSettingsReducerData = {
  name: ReduxStateEntities.USER_SETTINGS,
  initialState: {
    data: {
      timeZone: "Europe/Minsk",
      userRole: "student",
    },
  }
};

export const rtkSlices = {
  system: systemSlice,
  userSettings: getRtkSlice(userSettingsReducerData),
  scheduleEvents: getRtkSlice(scheduleEventsReducerData),
};

export const reducer = {
  systemState: rtkSlices.system.reducer,
  userSettingsState: rtkSlices.userSettings.reducer,
  scheduleEventsState: rtkSlices.scheduleEvents.reducer,
};
