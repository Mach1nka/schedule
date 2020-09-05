import {createSelector} from "@reduxjs/toolkit";
import {RootState} from "../store";


const getId = (_state: RootState, id: string | number) => id;

const selectScheduleEventsState = (state: RootState) => state?.scheduleEvents;

export const selectScheduleEventsData = createSelector(
  selectScheduleEventsState,
  (scheduleEventsState) => scheduleEventsState?.data
)
