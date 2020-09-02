import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ParsedResponse } from "../types/types";
import { rtkSlices } from "./root-reducer";
import { makeFirstUpper } from "../utils/make-frst-upper/make-frst-upper";
import { isStatusOk } from "../utils/is-status-ok/is-status-ok";

export const asyncThunkTypePrefix = "fetch";

export enum ReduxStateEntities {
  SYSTEM = "system",
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

export interface GetRtkSliceProps {
  name: ReduxStateEntities;
  initialState: any;
}

export const getRtkSlice = (getRtkSliceProps: GetRtkSliceProps) => {
  const {
    name,
    initialState,
  } = getRtkSliceProps;

  const fetchActionPrefix = `${asyncThunkTypePrefix}${makeFirstUpper(name)}`;

  return createSlice({
    name,
    initialState,
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
