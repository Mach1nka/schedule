import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { SwitchScheduleViewSC as SC } from './sc';
import {ROUTE_PATHS as PATHS} from '../../data/paths';

export const SwitchScheduleView: React.FC = () => {
  const { TabPane } = SC.TABS;
  const history = useHistory();
  const location = useLocation();

  const buttons = [
    {name:'List'},{name:'Table'},{name:'Calendar'}
  ];

  const handleChange = (evt: string): void => {
    history.push(evt.toLowerCase());
  }

  return (
    <SC.TABS onChange={handleChange} activeKey={location.pathname === '/' ? PATHS.table : location.pathname.slice(1)}>
      {buttons.map((button) => (
        <TabPane
          tab={button.name}
          key={button.name.toLowerCase()}
        />
          ))}
    </SC.TABS>
  );
};

