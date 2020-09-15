import React from 'react';
import { useHistory } from 'react-router-dom'

import {ScheduleButton as SC} from './sc'

interface Button {
  name: string
}

export const ScheduleButton: React.FC<Button> = (props) => {
  const { name } = props;
  const history = useHistory();

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>): void => {
    history.push(evt.currentTarget.value);
  }

  return (
    <>
      <SC.INPUT
        type="radio"
        id={name}
        name='checked'
        value={name}
        onChange={handleChange}
      />
      <SC.LABEL htmlFor={name}>
        {name}
      </SC.LABEL>
    </>
  )
};
