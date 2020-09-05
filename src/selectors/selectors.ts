import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";


const getId = (_state: RootState, id: string | number) => id;

const selectScheduleEventsState = (state: RootState) => state?.scheduleEventsState;

export const selectScheduleEventsData = createSelector(
  selectScheduleEventsState,
  (scheduleEventsState) => scheduleEventsState?.data
);
