import * as React from "react";
import Header from "../header/header";
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import { SwitchScheduleView } from '../switch-schedule-view/switch-schedule-view';
import CalendarView from "../calendar-view/calendar-view";
import {userSettingsReducerData} from "../../reducers/root-reducer";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import SavingSchedule from '../saving-schedule/saving-schedule';

const MainPage: React.FC = () => {
  const {
    getUserSettings,
    getScheduleEvents,
  } = React.useContext(MainDataContext);

  useGettingEntity({currentEntity: ReduxStateEntities.USER_SETTINGS, fetchFn: getUserSettings, data: userSettingsReducerData.initialState.data});
  useGettingEntity({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents});

  return (
    <Router>
      <Route path='/'>
        <Header/>
        <main>
          <SwitchScheduleView/>
          <Route path='/Calendar'>
            <CalendarView/>
          </Route>
          <Route path='/List'>
            {/* <ScheduleList/> */}
          </Route>
        </main>
      </Route>
    </Router>
  );
};

export default MainPage;
