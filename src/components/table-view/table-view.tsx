import React, {useState} from 'react';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import {Table, Tag} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useSelector} from "react-redux";
import {selectScheduleEventsData, selectUserTimeZone, selectScheduleTypesEvents, selectUserSet} from "../../selectors/selectors";
import FilterComponent from '../filter-component/filter-component';
import getTimeWithCorrectTimeZone from '../../utils/get-time/get-time-with-correct-timezone'
import {DATE_FORMAT} from '../../data/typeEvents';


interface ScheduleEvents {
  settings: string,
  key: string,
  startdate: string,
  duedate: string,
  title: string,
  status: string[],
}

const TableView: React.FC<any> = () => {
  const scheduleEvents = useSelector(selectScheduleEventsData) || [];
  const currentTimeZone = useSelector(selectUserTimeZone);
  const [hiddenRowOrColumn, setHiddenRowOrColumn] = useState<Set<string>>(new Set);
  const currentTypes = useSelector(selectScheduleTypesEvents);
  const setting = useSelector(selectUserSet);
  const handledFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {value} = event.currentTarget;
    const {checked} = event.currentTarget;
    if (checked && hiddenRowOrColumn.has(value)) {
      setHiddenRowOrColumn((prevState) => {
        prevState.delete(value);
        return new Set([...prevState]);
      });
    }
    if (!checked && !hiddenRowOrColumn.has(value)) {
      setHiddenRowOrColumn((prevState) => {
        return new Set([...prevState, value]);
      });
    }
  };

  const columnsSource: ColumnsType<ScheduleEvents> = [
    {
      title:
  <FilterComponent
    onChange={handledFilter}
    hiddenRowOrColumn={hiddenRowOrColumn}
    arrColumns={() => {}}
  />,
      dataIndex: 'settings',
      key: 'settings',
    },
    {
      title: 'Start date',
      dataIndex: 'startdate',
      key: 'startdate',
    },
    {
      title: 'Due date',
      dataIndex: 'duedate',
      key: 'duedate',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      key: 'status',
      dataIndex: 'status',
      render: (tag) => { 
        // console.log(setting.[tag[0]].color);
        console.log(tag);
        const textColor = setting.[tag[0]] ? setting.[tag[0]].backgroundColor : currentTypes.find((type) => type.name === tag[0]).color
        const color = setting.[tag[0]] ? setting.[tag[0]].color : 'black'
        return (
          <Tag color={textColor} key={tag} style={{color: color}}>
            {tag}
          </Tag>
        );
      }
    },
    {
      title: 'Organizer',
      dataIndex: 'organizer',
      key: 'organizer',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
  ];

  const columns = columnsSource.filter((element) => element?.title && !hiddenRowOrColumn.has(element.title.toString()));
  const listTasks = scheduleEvents.filter((element) => element?.type && !hiddenRowOrColumn.has(element.type.toString()));

  if (listTasks.length > 0) {
    const timetable = listTasks.reduce((acc, it, i) => {
      const temp: ScheduleEvents = {
        settings: String(i + 1),
        key: String(i),
        startdate: getTimeWithCorrectTimeZone(listTasks[i].startDateTime, currentTimeZone).format(DATE_FORMAT),
        duedate: getTimeWithCorrectTimeZone(listTasks[i].endDateTime, currentTimeZone).format(DATE_FORMAT),
        title:<Link
                className="link-to-description-page"
                to={{ pathname: "/event", search: `?id=${it.id}`}}
              >
                {it.name}
              </Link>,
        status: [String(listTasks[i].type)],

      };
      acc.push(temp);
      return acc;
    }, [] as ScheduleEvents[]);

    return (
      <div className="table">
        <Table dataSource={timetable} columns={columns} bordered/>
      </div>
    );
  }
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}

export default TableView;
