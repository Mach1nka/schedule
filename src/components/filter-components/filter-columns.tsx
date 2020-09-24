import React from 'react';
import {FilterComponentSC as SC} from './sc';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

  const FilterComponent: React.FC<any> = (props) => {
    const {
      onChange,
      hiddenColumns
    } = props;

    return (
      <div>
        <SC.BUTTON type="button">
          <SettingOutlined spin/>
        </SC.BUTTON>
        <SC.MODAL_WINDOW>
          <form>
            <input type="checkbox" onChange={onChange} value="Start date" checked={!hiddenColumns.has("Start date")}/>
            <label>Start date</label>
            <input type="checkbox" onChange={onChange} value="Due date" checked={!hiddenColumns.has("Due date")}/>
            <label>Due date</label>
          </form>
        </SC.MODAL_WINDOW>
      </div>
    );
  };

export default FilterComponent;
