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
  const [hiddenRowOrColumn, setHiddenRowOrColumn] = useState<Set<string>>(new Set);
  // const [arrColums] = useState(columnsSource.forEach(element) => {
  //   arrColums.push(element.title);
  // });

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

  const columns = columnsSource.filter((element) => element?.title && !hiddenRowOrColumn.has(element.title.toString()));
  const listTasks = scheduleEvents.filter((element) => element?.type && !hiddenRowOrColumn.has(element.type.toString()));

  if (listTasks.length > 0) {
    const timetable = listTasks.reduce((acc, it, i) => {
      const temp: ScheduleEvents = {
        settings: String(i + 1),
        key: String(i),
        startdate: String(formatDateFromUnix(listTasks[i].startDateTime, DateTimeFormat)),
        duedate: String(formatDateFromUnix(listTasks[i].endDateTime, DateTimeFormat)),
        title: String(listTasks[i].name),
        status: [String(listTasks[i].type)],
      };
      acc.push(temp);
      return acc;
    }, [] as ScheduleEvents[]);

    return (
      <>
        <Table dataSource={timetable} columns={columns} bordered={true}/>
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
