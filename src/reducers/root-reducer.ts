import {systemSlice} from "../slices/system-slice/system-slice";
<<<<<<< HEAD
import { getRtkSlice, ReduxStateEntities } from "./reducers-config";

export const rtkSlices = {
  system: systemSlice,
=======
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
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
};

export const reducer = {
  systemState: rtkSlices.system.reducer,
<<<<<<< HEAD
=======
  userSettingsState: rtkSlices.userSettings.reducer,
  scheduleEventsState: rtkSlices.scheduleEvents.reducer,
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
};
