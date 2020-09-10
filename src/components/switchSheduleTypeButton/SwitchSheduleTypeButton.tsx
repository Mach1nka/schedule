import React from 'react';
import { Link } from 'react-router-dom'

interface Button {
  name: string
}

export const SwitchSheduleTypeButton: React.FC<Button> = (props) => {
  console.log(props);
  const {
    name
  } = props;

  return (
    <div>
      <input
        type="radio"
        id={name}
        name="checked"
        onChange={() => {console.log('test')}
      }
      />
      <label htmlFor={name}>
        <Link to={name}>{name}</Link>
      </label>
    </div>
  )
};
