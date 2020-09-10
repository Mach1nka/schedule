import React from 'react'
import { SwitchSheduleTypeButton } from '../switchSheduleTypeButton/SwitchSheduleTypeButton'

import {switchSheduleTypeButtonsSC as SC} from "./sc";

export const SwitchSheduleTypeButtons: React.FC = () => {
  const buttons = [
    {name:'List'},{name:'Table'},{name:'Calendar'}
  ];

  return (
    <ul>
      {
        buttons.map((button) => (
          <li
            key={button.name}
          >
            <SwitchSheduleTypeButton {...button}/>
          </li>
        ))
      }
    </ul>
  )
}
