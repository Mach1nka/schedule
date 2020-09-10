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

    const colorMock = 'blue';

    return (
      <SC.ITEM
        style={{backgroundColor: colorMock}}
        key={id}
        onClick={()=>alert(`${name} --- there should be block with task`)}
      >
        {name}
      </SC.ITEM>
      );
  }

  return (
    <SC.LIST>
      {events.map(makeListItem)}
    </SC.LIST>
  );
};

export default CalendarDayEvents;
