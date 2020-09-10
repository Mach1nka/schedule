import * as React from "react";
import Header from "../header/header";
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";

const MainPage: React.FC = () => {

  const {
    getScheduleEvents,
  } = React.useContext(MainDataContext);

  useGettingEntity({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents});

  const scheduleEvents = useSelector(selectScheduleEventsData);

  console.log(scheduleEvents);

  return (
    <>
      <Header/>
    </>
  );
};

export default MainPage;
