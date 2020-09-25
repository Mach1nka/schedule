import React from 'react';
import {Link} from 'react-router-dom';
import {Menu, Dropdown, Button} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {typeEvents} from '../../../data/typeEvents';

const CreateNewTask: React.FC = () => {
    const menu = (
      <Menu>
        {
         typeEvents.map(el => {
           return (
             <Menu.Item key={el.id}>
               <Link 
                 to={{
                  pathname: "/formForMentor",
                  search: `?type=${el.name}`,
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