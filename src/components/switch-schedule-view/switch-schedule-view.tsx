import React from 'react'
import { ScheduleButton } from '../schedule-button/schedule-button'

import { SwitchScheduleViewSC as SC} from "./sc";

export const SwitchScheduleView: React.FC = () => {
  const buttons = [
    {name:'List'},{name:'Table'},{name:'Calendar'}
  ];

  return (
    <SC.UL>
      {
        buttons.map((button) => (
          <SC.LI
            key={button.name}
          >
            <ScheduleButton {...button}/>
          </SC.LI>
        ))
      }
    </SC.UL>
  )
}
