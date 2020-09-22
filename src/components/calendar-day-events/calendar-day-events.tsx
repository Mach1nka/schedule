import * as React from "react";
import { useHistory } from 'react-router-dom';
import {calendarDayEventsSC as SC} from "./sc";
import {ScheduleMockEvents} from "../../data/schedule";

interface CalendarDayEventsProps {
  events: ScheduleMockEvents[];
}

const CalendarDayEvents: React.FC<CalendarDayEventsProps> = (props) => {
  const history = useHistory();
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
        onClick={()=>history.push({
          pathname: "/Event",
          search: `?id=${id}`,
        })}
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
