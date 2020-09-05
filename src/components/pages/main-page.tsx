import * as React from "react";
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import CalendarView from "../calendar-view/calendar-view";

const MainPage: React.FC = () => {

  const {
    getScheduleEvents,
  } = React.useContext(MainDataContext);

  useGettingEntity({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents});

  return (
    <>
      <CalendarView/>
    </>
  );
};

export default MainPage;
