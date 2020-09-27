import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";


const getId = (_state: RootState, id: string | number) => id;
const getName = (_state: RootState, name: string | number) => name;

const selectScheduleEventsState = (state: RootState) => state?.scheduleEventsState;
const selectUserSettingsState = (state: RootState) => state?.userSettingsState;
const selectScheduleEventDraftState = (state: RootState) => state?.scheduleEventDraftState;
const selectScheduleTypeEventState = (state: RootState) => state?.scheduleTypesEventsState;

export const selectScheduleEventsData = createSelector(
  selectScheduleEventsState,
  (scheduleEventsState) => scheduleEventsState?.data
);

export const selectScheduleEventDraftData = createSelector(
  selectScheduleEventDraftState,
  (scheduleEventDraftState) => scheduleEventDraftState?.data
);

export const selectScheduleEventById = createSelector(
  selectScheduleEventsState,
  getId,
  (scheduleEventsState, id) => scheduleEventsState?.data?.find((event) => event.id === id)
);

export const selectScheduleTypeEventByName = createSelector(
  selectScheduleTypeEventState,
  getName,
  (scheduleTypesEventsState, name) => scheduleTypesEventsState?.data?.find((type) => type.name === name)
);

export const selectScheduleTypesEvents = createSelector(
  selectScheduleTypeEventState,
  (scheduleTypesEventsState) => scheduleTypesEventsState?.data
);

export const selectUserTimeZone = createSelector(
  selectUserSettingsState,
  (userSettingsState) => userSettingsState?.data?.timeZone
);

export const selectUserRole = createSelector(
  selectUserSettingsState,
  (userSettingsState) => userSettingsState?.data?.userRole
);
