import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Tag} from 'antd';
import {ColumnsType} from 'antd/es/table';
import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";
import FilterComponent from '../filter-component/filter-component';

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
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set);

  const DateTimeFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric"
  };

  const formatDateFromUnix = (unixDate, settings) => {
    return new Date(unixDate * 1000).toLocaleDateString('ru', settings);
  };

  const handledFilter = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.currentTarget.value;
    const checked = event.currentTarget.checked;
    if (checked && hiddenColumns.has(value)) {
      setHiddenColumns((prevState) => {
        prevState.delete(value);
        return new Set([...prevState]);
      });
    }
    if (!checked && !hiddenColumns.has(value)) {
      setHiddenColumns((prevState) => {
        return new Set([...prevState, value]);
      });
    }
  };

  const columnsSource: ColumnsType<ScheduleEvents> = [
    {
      title:
        <FilterComponent
          onChange={handledFilter}
          hiddenColumns={hiddenColumns}
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
      // вот здесь нужна помощь,
      // не могу айдишник передать в ссылку
      render: (name, id) => <a href={String(id)}>{name}</a>
    },
    {
      title: 'Type',
      key: 'status',
      dataIndex: 'status',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'Task') {
              color = 'tomato';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
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

  const columns = columnsSource.filter((it) => it?.title && !hiddenColumns.has(it.title.toString()));

  if (scheduleEvents.length > 0) {
    const templayte = scheduleEvents.reduce((acc, it, i) => {
      const temp: ScheduleEvents = {
        settings: String(i + 1),
        key: String(i),
        startdate: String(formatDateFromUnix(scheduleEvents[i].startDateTime, DateTimeFormat)),
        duedate: String(formatDateFromUnix(scheduleEvents[i].endDateTime, DateTimeFormat)),
        title: String(scheduleEvents[i].name),
        status: [String(scheduleEvents[i].type)],
      };
      acc.push(temp);
      return acc;
    }, [] as ScheduleEvents[]);

    return (
      <>
        <Table dataSource={templayte} columns={columns}/>
      </>
    );
  };
  return (
    <>
      <h1>Loading...</h1>
    </>
  );
}

export default TableView;
