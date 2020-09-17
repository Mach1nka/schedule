import * as React from "react";
import Header from "../header/header";
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import ScheduleList from "../schedule-list/schedule-list";
import CalendarView from "../calendar-view/calendar-view";
import {userSettingsReducerData} from "../../reducers/root-reducer";

const MainPage: React.FC = () => {
  const {
    getUserSettings,
    getScheduleEvents,
  } = React.useContext(MainDataContext);

  useGettingEntity({currentEntity: ReduxStateEntities.USER_SETTINGS, fetchFn: getUserSettings, data: userSettingsReducerData.initialState.data});
  useGettingEntity({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents});

  return (
    <>
      <Header/>
      <main>
        <ScheduleList/>
      </main>
    </>
  );
};

export default MainPage;
