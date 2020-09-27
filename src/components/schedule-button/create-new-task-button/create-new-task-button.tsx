import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {Menu, Dropdown, Button} from "antd";
import { PlusOutlined } from '@ant-design/icons';
import {selectScheduleTypesEvents} from '../../../selectors/selectors';
import {ROUTE_PATHS as PATHS} from '../../../data/paths';

const CreateNewTask: React.FC = () => {
    const typeEvents = useSelector(selectScheduleTypesEvents);
    const menu = (
      <Menu>
        {
        typeEvents && 
          typeEvents.map(el => {
            return (
              <Menu.Item key={`${el.name}${el.id}`}>
                <Link 
                  to={{
                    pathname: `/${PATHS.formForMentor}`,
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
      <Dropdown overlay={menu} trigger={['click']} style={marginBottom: '5px'}>
        <Button type="primary">
          <PlusOutlined/> New Task 
        </Button>
      </Dropdown>
    );
};

export default CreateNewTask;