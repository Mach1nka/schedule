import React from 'react';
import { Form, Input } from 'antd';

// import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
// import Input from './Input/Input';

const FormHeader = ({ form }): React.ReactElement => {
  return (
    <>
      <Form.Item name="name" label="Name Task" rules={[{ required: true }]}>
        <Input allowClear />
      </Form.Item>
      {form.getFieldValue('type') === 'New' ? (
        <Form.Item name="type" label="Type Event" rules={[{ required: true }]}>
          <Input allowClear />
        </Form.Item>
      ) : (
        <Form.Item
          name="type"
          label="Type Event"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <span>{`${form.getFieldValue('type')}`}</span>
        </Form.Item>
      )}
    </>
  );
};
export default FormHeader;
