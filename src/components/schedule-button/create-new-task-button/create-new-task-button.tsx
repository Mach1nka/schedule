import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Dropdown, Button} from "antd";
import { PlusOutlined } from '@ant-design/icons';

const typeEvents = [
  {
    name: 'Task',
    id: '1',
    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
  {
    name: 'Self Education',
    id: '2',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'YouTube Stream',
    id: '3',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Elective/YouTube Stream',
    id: '4',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'Test',
    id: '5',
    crossCheck: false,
    descriptionUrl: false,
    color: '',
  },
  {
    name: 'New',
    id: '6',
    crossCheck: true,
    descriptionUrl: true,
    color: '',
  },
];

const CreateNewTask: React.FC = () => {

    const menu = (
      <Menu>
        {
         typeEvents.map(el => {
           return (
             <Menu.Item key={el.id}>
               <Link 
                 to={{
                  pathname: "/event",
                  search: `?id=${el.name}`,
              }}
               >
                 {el.name}
               </Link>
             </Menu.Item>
           );
         }) 
        }
      </Menu>
    );

    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <Button type="primary">
          <PlusOutlined/> New Task 
        </Button>
      </Dropdown>
    );
};

export default CreateNewTask;