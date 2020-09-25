import {ScheduleMockEvents} from "../data/schedule";
import {ScheduleMockTypesEvents} from "../data/typeEvents";

export interface ScheduleEventsState {
  data: null | ScheduleMockEvents[];
}
export interface ScheduleEventCurrentState {
  data: null | ScheduleMockEvents;
}

export interface ScheduleTypesEventsState {
  data: null | ScheduleMockTypesEvents[];
}
export interface ScheduleTypesEventsCurrentState {
  data: null | ScheduleMockTypesEvents;
}