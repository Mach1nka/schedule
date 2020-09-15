import * as React from "react";
<<<<<<< HEAD

import { SwitchSheduleTypeButtons } from '../switchSheduleTypeButtons/SwitchSheduleTypeButton';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
    <>
      <Router>
        <Route path="/">
          <SwitchSheduleTypeButtons />
        </Route>
      </Router>
=======
import Header from "../header/header";
import {MainDataContext} from "../../context/main-data-context";
import useGettingEntity from "../../hooks/use-getting-entity/use-getting-entity";
import {ReduxStateEntities} from "../../reducers/reducers-config";
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
      <CalendarView/>
>>>>>>> 765371784c8d9b9ce0bd8f91721dc61055499bbe
    </>
  );
};

export default MainPage;
