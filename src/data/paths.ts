import {teamId, teamIdForTypesEvent} from "../config";

export const paths = {

};

export const appSearchParam = {

};

export const apiScheduleBackPath = {
  HOST: "https://rs-react-schedule.firebaseapp.com/api",
  EVENTS: `team/${teamId}/events`,
  EVENT: `team/${teamId}/event`,
};

export const apiScheduleTypeEventsBackPath = {
  HOST: "https://rs-react-schedule.firebaseapp.com/api",
  TYPES_EVENTS: `team/${teamIdForTypesEvent}/events`,
  TYPE_EVENT: `team/${teamIdForTypesEvent}/event`,
};