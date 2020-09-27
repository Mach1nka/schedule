import * as React from "react";
import {useHistory} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {calendarDayEventsSC as SC} from "./sc";
import {ScheduleMockEvents} from "../../data/schedule";
import {ROUTE_PATHS as PATHS} from '../../data/paths';
import {selectScheduleTypesEvents, selectUserSet} from "../../selectors/selectors";
import sortEventTypes from '../../utils/sort-type-events/sort-type-events';

interface CalendarDayEventsProps {
  events: ScheduleMockEvents[];
}

const CalendarDayEvents: React.FC<CalendarDayEventsProps> = (props) => {
  const typeEvents = useSelector(selectScheduleTypesEvents) || [];
  const setting = useSelector(selectUserSet);
  const history = useHistory();
  const {
    events,
  } = props

  const makeListItem = (data) => {
    const {
      id,
      name,
      type,
    } = data;

    return (
      <SC.ITEM
        key={id}
        color={setting.[type] ? setting.[type].backgroundColor : sortEventTypes(type, typeEvents)}
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
