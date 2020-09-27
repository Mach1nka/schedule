import {systemSlice} from "../slices/system-slice/system-slice";
import {scheduleEventDraftSlice} from "../slices/schedule-event-draft-slice/schedule-event-draft-slice";
import {getRtkSlice, ReduxStateEntities} from "./reducers-config";
import { ScheduleEventsState, ScheduleEventCurrentState, ScheduleTypesEventsState, ScheduleTypesEventsCurrentState } from "../types/schedule-events-types";

const scheduleEventsReducerData = {
  name: ReduxStateEntities.SCHEDULE_EVENTS,
  initialState: {
    data: null,
  } as ScheduleEventsState
};

const scheduleTypesEventsReducerData = {
  name: ReduxStateEntities.SCHEDULE_TYPES_EVENTS,
  initialState: {
    data: [
      {
        name: 'New',
        type: 'new',
        crossCheck: "true",
        descriptionUrl: "true",
        color: "rgba(103, 61, 61, 1)",
      },
    ],
  } as ScheduleTypesEventsState
};

const scheduleTypeEventCurrentReducerData = {
  name: ReduxStateEntities.SCHEDULE_TYPE_EVENT_CURRENT,
  initialState: {
    data: null,
  } as ScheduleTypesEventsCurrentState
};

const scheduleEventCurrentReducerData = {
  name: ReduxStateEntities.SCHEDULE_EVENT_CURRENT,
  initialState: {
    data: null,
  } as ScheduleEventCurrentState
};

export const userSettingsReducerData = {
  name: ReduxStateEntities.USER_SETTINGS,
  initialState: {
    data: {
      timeZone: "Europe/Minsk",
      userRole: "student",
      colorsForIventType: '',
    },
  }
};

export const rtkSlices = {
  system: systemSlice,
  userSettings: getRtkSlice(userSettingsReducerData),
  scheduleEvents: getRtkSlice(scheduleEventsReducerData),
  scheduleTypesEvents: getRtkSlice(scheduleTypesEventsReducerData),
  scheduleEventCurrent: getRtkSlice(scheduleEventCurrentReducerData),
  scheduleTypeEventCurrent: getRtkSlice(scheduleTypeEventCurrentReducerData),
  scheduleEventDraft: scheduleEventDraftSlice,
};

export const reducer = {
  systemState: rtkSlices.system.reducer,
  userSettingsState: rtkSlices.userSettings.reducer,
  scheduleEventsState: rtkSlices.scheduleEvents.reducer,
  scheduleEventCurrentState: rtkSlices.scheduleEventCurrent.reducer,
  scheduleEventDraftState: rtkSlices.scheduleEventDraft.reducer,
  scheduleTypesEventsState: rtkSlices.scheduleTypesEvents.reducer,
  scheduleTypeEventCurrentState: rtkSlices.scheduleTypeEventCurrent.reducer,
};
