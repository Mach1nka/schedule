import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";


const getId = (_state: RootState, id: string | number) => id;

const selectScheduleEventsState = (state: RootState) => state?.scheduleEventsState;
const selectUserSettingsState = (state: RootState) => state?.userSettingsState;

export const selectScheduleEventsData = createSelector(
  selectScheduleEventsState,
  (scheduleEventsState) => scheduleEventsState?.data
);

export const selectUserTimeZone = createSelector(
  selectUserSettingsState,
  (userSettingsState) => userSettingsState?.data?.timeZone
);

export const selectUserRole = createSelector(
  selectUserSettingsState,
  (userSettingsState) => userSettingsState?.data?.userRole
);
