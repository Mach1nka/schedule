import {createSlice} from "@reduxjs/toolkit";
import {ReduxStateEntities} from "../../reducers/reducers-config";

export interface SystemReducerState {
  errors: Record<string, string> | null;
  notifications: Record<string, string> | null;
}

const initialState: SystemReducerState = {
  errors: {},
  notifications: {},
};

export const systemSlice = createSlice({
  name: ReduxStateEntities.SYSTEM,
  initialState,
  reducers: {
    errorsAdd: (stateRTK, action) => {
      if (action.payload && action.payload.errors) {
        const errors = {...action.payload.errors};

        stateRTK.errors = Object.keys(errors).reduce((accum, it) => {

          return {
            ...accum,
            [it]: Array.isArray(errors[it]) ? errors[it].join(`, `) : errors[it],
          }
        }, {});

        return stateRTK;
      }

      if (action.payload && action.payload.message) {
        stateRTK.errors = {
          [action.type]: action.payload.message,
        }

        return stateRTK;
      }

      return stateRTK;
    },
    errorRemove: (stateRTK, action) => {
      if (stateRTK.errors) {
        delete stateRTK.errors[action.payload];
      }

      return stateRTK;
    },
    errorsClear: (stateRTK) => {
      if(stateRTK.errors) {
        stateRTK.errors = {};
      }

      return stateRTK;
    },
    notificationsAdd: (stateRTK, action) => {
      if (action.payload?.notification) {
        const notifications = {...stateRTK.notifications, ...action.payload.notification};
        stateRTK.notifications = Object.keys(notifications).reduce((accum, it) => {

          return {
            ...accum,
            [`${it}`]: Array.isArray(notifications[it]) ? notifications[it].join(`, `) : notifications[it],
          }
        }, {});
      }

      return stateRTK;
    },
    notificationRemove: (stateRTK, action) => {
      if (stateRTK.notifications) {
        delete stateRTK.notifications[action.payload];
      }

      return stateRTK;
    },
    notificationClear: (stateRTK) => {
      if (stateRTK.notifications) {
        stateRTK.notifications = {};
      }

      return stateRTK;
    }
  }
});
