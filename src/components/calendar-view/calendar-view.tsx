import * as React from "react";
import {Calendar} from "antd";
import moment from "moment";
import {useSelector} from "react-redux";
import CalendarDayEvents from "../calendar-day-events/calendar-day-events";
import {selectScheduleEventsData} from "../../selectors/selectors";
import {calendarViewSC as SC} from "./sc";

interface CalendarViewProps {

}

const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const scheduleEvents = useSelector(selectScheduleEventsData);

  const getListData = (events, value): any[] => {
    return events?.filter((it) => {
      return moment(value).isBetween(moment(Number(it.startDateTime)), moment(Number(it.endDateTime)));
    });
  };

  const getDateCellRender = (value) => {
    const currentDay = moment(value).format("D");
    const listData = scheduleEvents && getListData(scheduleEvents, value);

    return (
      <SC.DAY_CONTAINER>
        {currentDay}
        {(listData && listData?.length > 0) && <CalendarDayEvents events={listData}/>}
      </SC.DAY_CONTAINER>
    );
  };

  return (
    <Calendar
      dateFullCellRender={getDateCellRender}
    />
  );
};

export default CalendarView;
