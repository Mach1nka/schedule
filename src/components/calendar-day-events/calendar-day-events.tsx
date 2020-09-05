import * as React from "react";
import {calendarDayEventsSC as SC} from "./sc";
import {ScheduleMockEvents} from "../../data/schedule";

interface CalendarDayEventsProps {
  events: ScheduleMockEvents[];
}

const CalendarDayEvents: React.FC<CalendarDayEventsProps> = (props) => {
  const {
    events,
  } = props;

  const makeListItem = (data) => {
    const {
      id,
      name,
      color,
    } = data;

    return (
      <SC.ITEM
        style={{backgroundColor: color}}
        key={id}
      >
        {name}
      </SC.ITEM>);
  }

  return (
    <SC.LIST>
      {events.map(makeListItem)}
    </SC.LIST>
  );
};

export default CalendarDayEvents;
