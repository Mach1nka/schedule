import * as React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {userSettingsReducerData} from "../../reducers/root-reducer";
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";

import { SwitchScheduleView } from '../switch-schedule-view/switch-schedule-view';
import Header from "../header/header";
import ScheduleList from "../schedule-list/schedule-list";
import CalendarView from "../calendar-view/calendar-view";
import SavingSchedule from '../saving-schedule/saving-schedule';
import CreateNewTaskButton from '../schedule-button/create-new-task-buuton/create-new-task-button';

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
            <ScheduleList/>
          </Route>
          <Route path='/Table'>
            <CreateNewTaskButton/>
          </Route>
        </main>
      </Route> 
    </Router>
  );
};

export default MainPage;
