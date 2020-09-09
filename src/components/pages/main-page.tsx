import * as React from "react";
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";
import LoadMoreList from "../task-list/Task-List";

const MainPage: React.FC = () => {

  const {
    getScheduleEvents,
  } = React.useContext(MainDataContext);

  useGettingEntity({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents});

  const scheduleEvents = useSelector(selectScheduleEventsData);

  console.log(scheduleEvents);

  return (
    <>
      <LoadMoreList />
    </>
  );
};

export default MainPage;
