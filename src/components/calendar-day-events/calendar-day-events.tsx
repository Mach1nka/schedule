import * as React from "react";
import { useHistory } from 'react-router-dom';
import {calendarDayEventsSC as SC} from "./sc";
import {ScheduleMockEvents} from "../../data/schedule";
import {ROUTE_PATHS as PATHS} from '../../data/paths';

interface CalendarDayEventsProps {
  events: ScheduleMockEvents[];
}

const CalendarDayEvents: React.FC<CalendarDayEventsProps> = (props) => {
  const history = useHistory();
  const {
    events,
  } = props

  const makeListItem = (data) => {
    const {
      id,
      name,
      color,
    } = data;

    return (
      <SC.ITEM
        key={id}
        color={color}
        onClick={() => history.push({
          pathname: `/${PATHS.event}`,
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
