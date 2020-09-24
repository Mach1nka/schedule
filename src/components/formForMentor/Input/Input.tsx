import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Layout } from 'antd';

const InputMy = ({ type, form }): React.ReactElement => {
  return (
    <>
      <Form.Item label="Description" name="description" rules={[{ required: true }]}>
        <Input.TextArea autoSize={{ minRows: 3, maxRows: 8 }} allowClear/>
      </Form.Item>
      {type.descriptionUrl ? (
        <Form.Item label="Description Url" name="descriptionUrl" rules={[{ required: true }]}>
          <Input allowClear/>
        </Form.Item>
      ) : (
        <>
          <Form.Item label="Comment" name="linkComment" rules={[{ required: true }]}>
            <Input.TextArea allowClear/>
          </Form.Item>
          <Form.Item label="Event link" name="link" rules={[{ required: true }]}>
            <Input allowClear/>
          </Form.Item>
        </>
      )}

    </>
  );
};
export default InputMy;
