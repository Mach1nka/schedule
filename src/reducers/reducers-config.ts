<<<<<<< HEAD
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ParsedResponse } from "../types/types";
import { rtkSlices } from "./root-reducer";
import { makeFirstUpper } from "../utils/make-frst-upper/make-frst-upper";
import { isStatusOk } from "../utils/is-status-ok/is-status-ok";
=======
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ParsedResponse} from "../types/types";
import {rtkSlices} from "./root-reducer";
import {makeFirstUpper} from "../utils/make-frst-upper/make-frst-upper";
import {isStatusOk} from "../utils/is-status-ok/is-status-ok";
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe

export const asyncThunkTypePrefix = "fetch";

export enum ReduxStateEntities {
  SYSTEM = "system",
<<<<<<< HEAD
=======
  USER_SETTINGS = "userSettings",
  SCHEDULE_EVENTS = "scheduleEvents",
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
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

<<<<<<< HEAD
export interface GetRtkSliceProps {
  name: ReduxStateEntities;
  initialState: any;
}

export const getRtkSlice = (getRtkSliceProps: GetRtkSliceProps) => {
=======
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
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
  const {
    name,
    initialState,
  } = getRtkSliceProps;

  const fetchActionPrefix = `${asyncThunkTypePrefix}${makeFirstUpper(name)}`;

  return createSlice({
    name,
<<<<<<< HEAD
    initialState,
=======
    initialState: {...defaultInitialState, ...initialState} as S,
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
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
<<<<<<< HEAD

=======
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
          stateRTK.data = action.payload.data;
        }
        stateRTK.uploaded = true;
      },
    },
  })
};
