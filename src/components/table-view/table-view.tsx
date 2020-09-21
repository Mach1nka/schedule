import React from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

import {useSelector} from "react-redux";
import {selectScheduleEventsData} from "../../selectors/selectors";



interface Columns {
  title: string;
  key: string;
  time: string;
  date: string;
  status: string[];
  organizer: string;
}

const TableView: React.FC = () => {

  const scheduleEvents = useSelector(selectScheduleEventsData) || [];
  console.log(scheduleEvents);


  const DateTimeFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const formatDateFromUnix = (unixDate, settings) => {
    return new Date(unixDate * 1000).toLocaleDateString('ru', settings);
  };

 
  

  const columns: ColumnsType<Columns> = [
    {
      title: 'set',
      dataIndex: 'settings',
      key: 'settings',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: tags => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
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
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  if (scheduleEvents.length > 0) {
    const dataSource = [];

    for (let i = 0; i < scheduleEvents.length; i+=1) {
      const temp = {
        key: String(i),
        date: String(formatDateFromUnix(scheduleEvents[i].startDateTime, DateTimeFormat)),
        time: '9:00',
        title: String(scheduleEvents[i].description),
        status: [String(scheduleEvents[i].type)],
        organizer: '',
        
      }

      dataSource.push(temp)
    }
    
    console.log('дата')
    console.log(dataSource);

    return (
      <>
        <Table dataSource={dataSource} columns={columns}/>
      </>
    );

    
  }

  return (
    <>
      <h1>загружается таблица</h1>
    </>
  );
}

export default TableView;
