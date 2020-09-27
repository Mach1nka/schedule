import * as React from "react";
import {Calendar} from "antd";
import moment from "moment";
import {useSelector} from "react-redux";
import CalendarDayEvents from "../calendar-day-events/calendar-day-events";
import {selectScheduleEventsData, selectUserTimeZone} from "../../selectors/selectors";
import {calendarViewSC as SC} from "./sc";
import sortTimezones from '../../utils/sort-timezones/sort-timezones';
import {DATE_FORMAT} from '../../data/typeEvents';

interface CalendarViewProps {

}

const CalendarView: React.FC<CalendarViewProps> = () => {
  const scheduleEvents = useSelector(selectScheduleEventsData);
  const currentTimeZone = useSelector(selectUserTimeZone);

  const getListData = (events, value): any[] => {
    return events?.filter((it) => {
      return value.utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT) >= moment(it.startDateTime, 'X').utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT) 
      && value.utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT) <= moment(it.endDateTime, 'X').utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT)
    });
  };

  const getDateCellRender = (value) => {
    const currentDay = value.utcOffset(sortTimezones(currentTimeZone), false).format("D");
    const listData = scheduleEvents && getListData(scheduleEvents, value);
    
    return (
      <SC.DAY_CONTAINER>
        {currentDay}
        {(listData && listData?.length > 0) && <CalendarDayEvents events={listData}/>}
      </SC.DAY_CONTAINER>
    );
  };

  return <Calendar dateFullCellRender={getDateCellRender}/>
};

export default CalendarView;
