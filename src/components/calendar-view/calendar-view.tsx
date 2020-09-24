import * as React from "react";
// import {Calendar} from "antd";
import { Calendar, Select, Radio, Col, Row } from 'antd';
import moment from "moment";
import {useSelector} from "react-redux";
import CalendarDayEvents from "../calendar-day-events/calendar-day-events";
import {selectScheduleEventsData} from "../../selectors/selectors";
import {calendarViewSC as SC} from "./sc";

interface CalendarViewProps {

}

const CalendarView: React.FC<CalendarViewProps> = (props) => {
  const scheduleEvents = useSelector(selectScheduleEventsData);
  const [typeOfDate, setTypeOfDay] = React.useState('month');

  const getListData = (events, value): any[] => {
    return events?.filter((it) => {
      return moment(value).isBetween(moment(Number(it.startDateTime)*1000), moment(Number(it.endDateTime)*1000));
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
