import {systemSlice} from "../slices/system-slice/system-slice";
import {getRtkSlice, ReduxStateEntities} from "./reducers-config";
import { ScheduleEventsState } from "../types/schedule-events-types";

const scheduleEventsReducerData = {
  name: ReduxStateEntities.SCHEDULE_EVENTS,
  initialState: {
    data: null,
  } as ScheduleEventsState
};

export const rtkSlices = {
  system: systemSlice,
  scheduleEvents: getRtkSlice<ScheduleEventsState>(scheduleEventsReducerData),
};

export const reducer = {
  systemState: rtkSlices.system.reducer,
  scheduleEventsState: rtkSlices.scheduleEvents.reducer,
};
