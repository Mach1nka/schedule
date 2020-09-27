import * as React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";
import { SwitchScheduleView } from '../switch-schedule-view/switch-schedule-view';
import Header from "../header/header";
import ScheduleList from "../schedule-list/schedule-list";
import TableView from '../table-view/table-view';
import CalendarView from "../calendar-view/calendar-view";
import {userSettingsReducerData} from "../../reducers/root-reducer";
import SavingSchedule from '../saving-schedule/saving-schedule';

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
          <Route path='/List'>
            <ScheduleList/>
            <SavingSchedule name='.sc__ROW-gBRphs'/>
          </Route>
          <Route path='/Table'>
            <TableView />
            <SavingSchedule name='.ant-table'/>
          </Route>
          <Route path='/Calendar'>
            <CalendarView/>
            <SavingSchedule name='.ant-picker-calendar'/>
          </Route>
        </main>
      </Route>
    </Router>
  );
};

export default MainPage;
