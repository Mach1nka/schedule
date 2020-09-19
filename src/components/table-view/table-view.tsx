import React from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface Columns {
  title: string;
  key: string;
  time: string;
  date: string;
  status: string[];
  organizer: string;
}

const TableView: React.FC = () => {
  const dataSource: Columns[] = [
    {
      key: '1',
      date: '11.01.1991',
      time: '9:01',
      title: 'New York No. 1 Lake Park',
      status: ['nice', 'developer'],
      organizer: '',
    },
    {
      key: '2',
      date: '11.01.1992',
      time: '9:02',
      title: 'London No. 1 Lake Park',
      status: ['loser'],
      organizer: '',
    },
    {
      key: '3',
      date: '11.01.1993',
      time: '9:03',
      title: 'Sidney No. 1 Lake Park',
      status: ['cool', 'teacher'],
      organizer: '',
    },

  ];

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

  return (
    <>
      <Table dataSource={dataSource} columns={columns}/>
    </>
  );
}

export default TableView;
