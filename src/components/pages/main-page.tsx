import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {useSelector} from 'react-redux';
import {userSettingsReducerData} from '../../reducers/root-reducer';
import {MainDataContext} from '../../context/main-data-context';
import useGettingEntity from '../../hooks/use-getting-entity/use-getting-entity';
import {ReduxStateEntities} from '../../reducers/reducers-config';
import {selectUserRole} from '../../selectors/selectors';

import { SwitchScheduleView } from '../switch-schedule-view/switch-schedule-view';
import Header from '../header/header';
import ScheduleList from '../schedule-list/schedule-list';
import CalendarView from '../calendar-view/calendar-view';
import SavingSchedule from '../saving-schedule/saving-schedule';
import CreateNewTask from '../schedule-button/create-new-task-button/create-new-task-button';
import PreViewEvent from '../preViewEvent/PreViewEvent';
import Form from '../formForMentor/Form';

const MainPage: React.FC = () => {
  const {
    getUserSettings,
    getScheduleEvents,
    getScheduleTypesEvents,
  } = React.useContext(MainDataContext);

  const userRole = useSelector(selectUserRole);

  useGettingEntity({currentEntity: ReduxStateEntities.USER_SETTINGS, fetchFn: getUserSettings, data: userSettingsReducerData.initialState.data});
  useGettingEntity({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents});
  useGettingEntity({currentEntity: ReduxStateEntities.SCHEDULE_TYPES_EVENTS, fetchFn: getScheduleTypesEvents});
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
            {userRole === 'mentor' && <CreateNewTask/>}
          </Route>  
          <Route path='/event'>
            <PreViewEvent/>
          </Route>
          <Route path='/formForMentor'>
            <Form/>
          </Route>
        </main>
      </Route>
    </Router>
  );
};

export default MainPage;
