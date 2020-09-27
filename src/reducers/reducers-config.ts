import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ParsedResponse} from "../types/types";
import {rtkSlices} from "./root-reducer";
import {makeFirstUpper} from "../utils/make-frst-upper/make-frst-upper";
import {isStatusOk} from "../utils/is-status-ok/is-status-ok";

export const asyncThunkTypePrefix = "fetch";

export enum ReduxStateEntities {
  SYSTEM = "system",
  USER_SETTINGS = "userSettings",
  SCHEDULE_EVENTS = "scheduleEvents",
  SCHEDULE_TYPES_EVENTS = "scheduleTypesEvents",
  SCHEDULE_EVENT_CURRENT = "scheduleEventCurrent",
  SCHEDULE_TYPE_EVENT_CURRENT = "scheduleTypeEventCurrent",
  SCHEDULE_EVENT_DRAFT = "scheduleEventDraft",
}

export type CreateAsyncThunkProps = {
  fetchFn: (...args: any) => any;
  data?: any;
};

export interface GetAsyncThunkProps {
  typePrefix: string;
}

export const getAsyncThunk = (getAsyncThunkProps: GetAsyncThunkProps) => {
  const {
    typePrefix,
  } = getAsyncThunkProps;
  return createAsyncThunk<ParsedResponse<any>, CreateAsyncThunkProps>(
    typePrefix,
    async (fetchProps, thunkAPI) => {
      const {fetchFn, data} = fetchProps;
      const response = await fetchFn(data);

      if (response.status !== 200) {
        thunkAPI.dispatch({type: rtkSlices.system.actions.errorsAdd.toString(), payload: response})
      }

      if (response.status === 200) {
        thunkAPI.dispatch({type: rtkSlices.system.actions.errorsClear.toString(), payload: response});
      }

      return response;
    },
  )
};

interface DefaultInitialState {
  data?: any,
  uploaded?: boolean,
}

const defaultInitialState = {
  data: null,
  uploaded: false,
}

export interface GetRtkSliceProps<S> {
  name: ReduxStateEntities;
  initialState: S;
}

export const getRtkSlice = <S extends DefaultInitialState>(getRtkSliceProps: GetRtkSliceProps<S>) => {
  const {
    name,
    initialState,
  } = getRtkSliceProps;

  const fetchActionPrefix = `${asyncThunkTypePrefix}${makeFirstUpper(name)}`;

  return createSlice({
    name,
    initialState: {...defaultInitialState, ...initialState} as S,
    reducers: {
      cleaning: (stateRTK) => {
        stateRTK[name] = null;
      },
    },
    extraReducers: {
      [`${fetchActionPrefix}/pending`]: (stateRTK) => {
        stateRTK.uploaded = false;
      },
      [`${fetchActionPrefix}/fulfilled`]: (stateRTK, action) => {
        if (isStatusOk(action)) {
          stateRTK.data = action.payload.data;
        }
        stateRTK.uploaded = true;
      },
    },
  })
};
