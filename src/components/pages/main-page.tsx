import * as React from "react";

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
    </>
  );
};

export default MainPage;
