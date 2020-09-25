import React, { useState } from 'react';
import { FilterComponentSC as SC } from './sc';
import { SettingOutlined, FontColorsOutlined, BgColorsOutlined } from '@ant-design/icons';

import { CirclePicker } from 'react-color';


// import ColorPicker from '../colorpicker/colorpicker';


const FilterComponent: React.FC<any> = (props) => {
  const {
    onChange,
    hiddenRowOrColumn,
    // arrColumns
  } = props;

  const [colorHere, setColorHere] = useState(false);

  const needColor = (typeTask, typeColor) => {
    console.log(typeColor, typeTask)
    setColorHere(true)
  }

  const handleChange = (e) => {
    console.log(e.hex)
  }

  // console.log(arrColumns);

  return (
    <div>
      <SC.BUTTON>
        <SettingOutlined />
      </SC.BUTTON>
      <SC.DIV>
        {/* {arrColumns.map((value) => {
          <>
            <input type="checkbox" onChange={onChange} value={value} checked={!hiddenColumns.has(value)}/>
            <label>{value}</label>
          </>
        })} */}
        <div>
          <SC.P><strong>Schedule</strong></SC.P>
          <SC.INPUT_BLOCK>
            <div>
              <input style={{margin: "0 5px"}} type="checkbox" onChange={onChange} value="Start date" checked={!hiddenRowOrColumn.has("Start date")}/>
              <label>Start date</label>
            </div>
            <div>
              <input style={{margin: "0 5px"}} type="checkbox" onChange={onChange} value="Due date" checked={!hiddenRowOrColumn.has("Due date")}/>
              <label>Due date</label>
            </div>
          </SC.INPUT_BLOCK>
        </div>
        <div>
          <SC.P><strong>Event</strong></SC.P>
          <SC.INPUT_BLOCK>
            <div>
              <input style={{margin: "0 5px"}} type="checkbox" onChange={onChange} value="Lecture" checked={!hiddenRowOrColumn.has("Lecture")}/>
              <label>Lecture</label>
              <BgColorsOutlined onClick={() => needColor("Lecture", 'bg')} /> <FontColorsOutlined  /> 
              
            </div>
            
        </SC.INPUT_BLOCK>
        </div>
        <div>
          {colorHere ? <div><CirclePicker onChange={(e) => handleChange(e)}/></div> : null}
        </div>
     </SC.DIV>
    </div>
  );
};

export default FilterComponent;



