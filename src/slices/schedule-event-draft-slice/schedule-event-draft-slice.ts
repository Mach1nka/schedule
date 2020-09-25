import {createSlice} from "@reduxjs/toolkit";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {ScheduleMockEvents} from '../../data/schedule'


const initialState: Record<'data', ScheduleMockEvents | null> = {
  data: null,
};

export const scheduleEventDraftSlice = createSlice({
  name: ReduxStateEntities.SCHEDULE_EVENT_DRAFT,
  initialState,
  reducers: {
    draftAdd: (stateRTK, action) => {
      stateRTK.data = action.payload;
      return stateRTK;
    },
    draftClear: (stateRTK) => {
      stateRTK.data = null;
      return stateRTK;
    },
  }
});
