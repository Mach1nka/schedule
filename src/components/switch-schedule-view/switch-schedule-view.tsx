import React from 'react'
import { useHistory } from 'react-router-dom'
import { SwitchScheduleViewSC as SC } from './sc';

export const SwitchScheduleView: React.FC = () => {
  const { TabPane } = SC.TABS;
  const history = useHistory();

  const buttons = [
    {name:'List'},{name:'Table'},{name:'Calendar'}
  ];

  const handleChange = (evt: string): void => {
    history.push(evt);
  }

  return (
    <SC.TABS defaultActiveKey="1" onChange={handleChange}>
    {buttons.map((button) => (
        <TabPane
          tab={button.name}
          key={button.name}
          ></TabPane>
        ))}
      )
    </SC.TABS>
  );
};

