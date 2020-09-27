import React from 'react';
import { Form, Input } from 'antd';

const InputMy = ({ type }): React.ReactElement => {
  return (
    <>
      <Form.Item label="Description" name="description" rules={[{ required: true }]}>
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} allowClear/>
      </Form.Item>
      {type.descriptionUrl && JSON.parse(type.descriptionUrl) && (
        <Form.Item label="Description Url" name="descriptionUrl" rules={[{ required: type.name !== 'New' }]}>
          <Input allowClear/>
        </Form.Item>
      )}
      {type.link && JSON.parse(type.link) && (
        <>
          <Form.Item label="Comment" name="linkComment" rules={[{ required: type.name !== 'New' }]}>
            <Input.TextArea allowClear/>
          </Form.Item>
          <Form.Item label="Event link" name="link">
            <Input allowClear/>
          </Form.Item>
        </>
      )}

    </>
  );
};
export default InputMy;
