import React from 'react';
import { FilterComponentSC as SC } from './sc';
import { SettingOutlined } from '@ant-design/icons';

const FilterComponent: React.FC<any> = (props) => {
  const {
    onChange,
    hiddenRowOrColumn,
    // arrColumns
  } = props;

  // console.log(arrColumns);

  return (
    <div>
      <SC.BUTTON>
        <SettingOutlined/>
      </SC.BUTTON>
      <SC.DIV>
        {/* {arrColumns.map((value) => {
          <>
            <input type="checkbox" onChange={onChange} value={value} checked={!hiddenColumns.has(value)}/>
            <label>{value}</label>
          </>
        })} */}
        <input type="checkbox" onChange={onChange} value="Start date" checked={!hiddenRowOrColumn.has("Start date")}/>
        <label>Start date</label>
        <input type="checkbox" onChange={onChange} value="Due date" checked={!hiddenRowOrColumn.has("Due date")}/>
        <label>Due date</label>

        <input type="checkbox" onChange={onChange} value="Task" checked={!hiddenRowOrColumn.has("Task")}/>
        <label>Task</label>
      </SC.DIV>
    </div>
  );
};

export default FilterComponent;



