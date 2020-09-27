import React, { useState } from 'react';
import { SettingOutlined, FontColorsOutlined, BgColorsOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import { GithubPicker } from 'react-color';
import { FilterComponentSC as SC } from './sc';
import {ReduxStateEntities} from "../../reducers/reducers-config";
import {dispatchEntityHelper} from "../../helpers/dispatch-entity-helper/dispatch-entity-helper";
import {selectUserSettingsState, selectScheduleEventsData} from "../../selectors/selectors";
import {MainDataContext} from "../../context/main-data-context";

const FilterComponent: React.FC<any> = (props) => {
  const dispatch = useDispatch();

  const userSettingsStateData = useSelector(selectUserSettingsState)?.data;

  const scheduleEvents = useSelector(selectScheduleEventsData) || [];

  const typeTaskSet = new Set();

  for (let i = 0; i < scheduleEvents.length; i+=1) {
    if (scheduleEvents[i].type !== undefined) {
      typeTaskSet.add(scheduleEvents[i].type);
    }
  }

  const typeTaskArr = Array.from(typeTaskSet);

  const {
    onChange,
    hiddenRowOrColumn,
    // arrColumns
  } = props;

  const [colorHere, setColorHere] = useState(false);
  const [needColorForTypeTask, setNeedColorForTypeTask] = useState(false);
  const [needColorFor, setNeedColorFor] = useState(false);

  const needColor = (typeTask, typeColor) => {
    setNeedColorForTypeTask(typeTask);
    setNeedColorFor(typeColor);
    if (!needColorForTypeTask || !needColorFor || needColorFor !== typeColor || needColorForTypeTask !== typeTask) {
      setColorHere(true);
    } else {
      setColorHere(false);
      setNeedColorForTypeTask(false);
      setNeedColorFor(false);
    }
  }

  // const handleChange = (e) => {
  //   if (needColorFor && needColorForTypeTask) {
  //     localStorage.setItem(needColorForTypeTask + needColorFor, e.hex);
  //   }
  // }

  const {
    getUserSettings,
    setUserSettings,
  } = React.useContext(MainDataContext);

  const handleChange = (evt: SelectValue) => {
    
    if (needColorFor === 'text') {
      
      const temp = {
        ...userSettingsStateData,
        colorsForIventType: {
          ...userSettingsStateData?.colorsForIventType,
          [needColorForTypeTask]: {
            ...(userSettingsStateData?.colorsForIventType && needColorForTypeTask in userSettingsStateData?.colorsForIventType ? userSettingsStateData?.colorsForIventType[needColorForTypeTask] : {}),
            color: evt.hex
          }
        }
      };
      console.log(temp);
      setUserSettings({...temp})
      .then(() => dispatchEntityHelper({currentEntity: ReduxStateEntities.USER_SETTINGS, fetchFn: getUserSettings, dispatch}));
    }


    if (needColorFor === 'bg') {
      
      const temp = {
        ...userSettingsStateData,
        colorsForIventType: {
          ...userSettingsStateData?.colorsForIventType,
          [needColorForTypeTask]: {
            ...(userSettingsStateData?.colorsForIventType && needColorForTypeTask in userSettingsStateData?.colorsForIventType ? userSettingsStateData?.colorsForIventType[needColorForTypeTask] : {}),
            backgroundColor: evt.hex
          }
        }
      };
      setUserSettings({...temp})
      .then(() => dispatchEntityHelper({currentEntity: ReduxStateEntities.USER_SETTINGS, fetchFn: getUserSettings, dispatch}));
    }
  };


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
            {
              typeTaskArr.map(item => {
                return (
                  <div key={item}>
                    <input style={{margin: "0 5px"}} type="checkbox" onChange={onChange} value={item} checked={!hiddenRowOrColumn.has(item)}/>
                    
                    <label>{item}</label>

                    <BgColorsOutlined style={{margin: '0 10px'}} onClick={() => needColor(item, 'bg')}/>

                    <FontColorsOutlined onClick={() => needColor(item, 'text')}/>
                  </div>
                );
              })
            }
          </SC.INPUT_BLOCK>
        </div>
        <div>
          {colorHere ? <div><GithubPicker onChange={handleChange}/></div> : null}
        </div>
      </SC.DIV>
    </div>
  );
};

export default FilterComponent;
