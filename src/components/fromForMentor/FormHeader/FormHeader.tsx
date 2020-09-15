import React from 'react';
import { Form, Input, Select } from 'antd';

// import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
// import Input from './Input/Input';

const FormHeader = (): React.ReactElement => {
  const { Option } = Select;
  return (
    <>
      <Form.Item name="name" label="Name Task" rules={[{ required: true }]}>
        <Input allowClear />
      </Form.Item>
      <Form.Item
        name="type"
        label="Type Task"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select placeholder="Select a option and change input text above" allowClear>
          <Option value="task">Task</Option>
          <Option value="selfEducation">Self Education</Option>
          <Option value="youTubeStream">YouTube Stream</Option>
          <Option value="electiveYouTubeStream">Elective/YouTube Stream</Option>
          <Option value="test">Test</Option>
        </Select>
      </Form.Item>
    </>
  );
};
export default FormHeader;
