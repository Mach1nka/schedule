import React from 'react';
import { useHistory } from 'react-router-dom'
import {Button} from "antd";
import { PlusOutlined } from '@ant-design/icons';


const CreateNewTaskButton: React.FC = () => {
    const history = useHistory();

    const switchPage = (): void => {
        history.push('event');
    }

    return (
      <Button type="primary" icon={<PlusOutlined/>} onClick={switchPage}>
        New Task
      </Button>
    );
};

export default CreateNewTaskButton;