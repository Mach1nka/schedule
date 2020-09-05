import {scheduleMock, ScheduleMockEvents} from "../data/schedule";

export default class MainDataAdapter {
  static getScheduleEvents = (parseEventsProps): ScheduleMockEvents[] => {
    const {} = parseEventsProps;

    return parseEventsProps.length
      ? parseEventsProps
      : scheduleMock.events;
  }
}
