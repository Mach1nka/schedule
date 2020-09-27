import React, { useState } from 'react';
import { FilterComponentSC as SC } from './sc';
import { SettingOutlined, FontColorsOutlined, BgColorsOutlined } from '@ant-design/icons';

import { GithubPicker } from 'react-color';

import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";


const FilterComponent: React.FC<any> = (props) => {

  const scheduleEvents = useSelector(selectScheduleEventsData) || [];

  const typeTaskSet = new Set();

  for (let i = 0; i < scheduleEvents.length; i+=1) {
    if (scheduleEvents[i].type !== undefined) {
      typeTaskSet.add(scheduleEvents[i].type);
    }
    
  }

  const typeTaskArr = Array.from(typeTaskSet);

  console.log(typeTaskArr)


  const {
    onChange,
    hiddenRowOrColumn,
    // arrColumns
  } = props;


  const [colorHere, setColorHere] = useState(false);

  const [needColorForTask, setNeedColorForTask] = useState(false);
  const [needColorFor, setNeedColorFor] = useState(false);

  const needColor = (typeTask, typeColor) => {
    setNeedColorForTask(typeTask);
    setNeedColorFor(typeColor);
    if (!needColorForTask || !needColorFor || needColorFor !== typeColor || needColorForTask !== typeTask) {
      console.log(typeColor, typeTask)
      setColorHere(true);

    } else {
      
      setColorHere(false);
      setNeedColorForTask(false);
      setNeedColorFor(false);
    }
  }

  const handleChange = (e) => {
    if (needColorFor && needColorForTask) {
      localStorage.setItem(needColorForTask + needColorFor, e.hex);
    }
  }



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
              <BgColorsOutlined style={{margin: '0 10px'}} onClick={() => needColor("Lecture", 'bg')} /> <FontColorsOutlined onClick={() => needColor("Lecture", 'text')} /> 
              
            </div>
            <div>
              <input style={{margin: "0 5px"}} type="checkbox" onChange={onChange} value="Task" checked={!hiddenRowOrColumn.has("Task")}/>
              <label>Task</label>
              <BgColorsOutlined style={{margin: '0 10px'}} onClick={() => needColor("Task", 'bg')}/> <FontColorsOutlined onClick={() => needColor("Task", 'text')}/> 
              
            </div>
            <div>
              <input style={{margin: "0 5px"}} type="checkbox" onChange={onChange} value="Test" checked={!hiddenRowOrColumn.has("Test")}/>
              <label>Test</label>
              <BgColorsOutlined style={{margin: '0 10px'}} onClick={() => needColor("Test", 'bg')}/> <FontColorsOutlined onClick={() => needColor("Test", 'text')}/> 
              
            </div>
            {
              typeTaskArr.map(item => {
                return (
                  <div>
                    <input style={{margin: "0 5px"}} type="checkbox" onChange={onChange} value={item} checked={!hiddenRowOrColumn.has({item})}/>
                    <label>{item}</label>
                    <BgColorsOutlined style={{margin: '0 10px'}} onClick={() => needColor({type}, 'bg')}/> 
                    <FontColorsOutlined onClick={() => needColor({item}, 'text')}/>
                  </div>
                );
              })
            }
          </SC.INPUT_BLOCK>
        </div>
        <div>
          {colorHere ? <div><GithubPicker onChange={(e) => handleChange(e)}/></div> : null}
        </div>
      </SC.DIV>
    </div>
  );
};

export default FilterComponent;



