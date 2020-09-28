import * as React from "react";
import { Calendar } from 'antd';
import moment from "moment";
import {useSelector} from "react-redux";
import CalendarDayEvents from "../calendar-day-events/calendar-day-events";
import {selectScheduleEventsData, selectUserTimeZone} from "../../selectors/selectors";
import {calendarViewSC as SC} from "./sc";
import sortTimezones from '../../utils/sort-timezones/sort-timezones';
import {DATE_FORMAT_CALENDAR} from '../../data/typeEvents';

interface CalendarViewProps {

}

const CalendarView: React.FC<CalendarViewProps> = () => {
  const scheduleEvents = useSelector(selectScheduleEventsData);
  const currentTimeZone = useSelector(selectUserTimeZone);
  const [typeOfDate, setTypeOfDay] = React.useState('month');

  const getListData = (events, value): any[] => {
    return events?.filter((it) => {
      return value.utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR) >= moment(it.startDateTime, 'X').utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR)
      && value.utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR) <= moment(it.endDateTime, 'X').utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR)
    }).concat(events?.filter((it) => {
      return value.utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR) >= moment(it.startDateCrossCheck, 'X').utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR)
       && value.utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR) <= moment(it.endDateCrossCheck, 'X').utcOffset(sortTimezones(currentTimeZone), false).format(DATE_FORMAT_CALENDAR)})) 
  };

  const getDateCellRender = (value) => {
    const currentDay = value.utcOffset(sortTimezones(currentTimeZone), false).format("D");
    const listData = scheduleEvents && getListData(scheduleEvents, value);
  
    return (
      <SC.DAY_CONTAINER>
        {currentDay}
        {(listData && listData?.length > 0) && <CalendarDayEvents events={listData} dayNow={value}/>}
      </SC.DAY_CONTAINER>
    );
  };

  const monthCellRender = () => (
    <div
      onClickCapture={() => setTypeOfDay('month')}
      style={{width: '100%', height: '100%'}}
    />
  )

  return (
    <Calendar
      dateFullCellRender={getDateCellRender}
      mode={typeOfDate}
      onPanelChange={(e, type)=>{
        if(typeOfDate !== type) {
          typeOfDate === 'month' ? setTypeOfDay('year') : setTypeOfDay('month')
        }
      }}
      monthCellRender={monthCellRender}
    />
  );
};

export default CalendarView;
