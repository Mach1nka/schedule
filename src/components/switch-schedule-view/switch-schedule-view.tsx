import React from 'react'
import { Tabs } from 'antd';
import { useHistory } from 'react-router-dom'

export const SwitchScheduleView: React.FC = () => {
  const { TabPane } = Tabs;
  const history = useHistory();

  const buttons = [
    {name:'List'},{name:'Table'},{name:'Calendar'}
  ];

  const handleChange = (evt: string): void => {
    history.push(evt);
  }

  return (
    <Tabs defaultActiveKey="1" onChange={handleChange}>
    {buttons.map((button) => (
        <TabPane
          tab={button.name}
          key={button.name}
          ></TabPane>
        ))}
      )
    </Tabs>
  );
};

