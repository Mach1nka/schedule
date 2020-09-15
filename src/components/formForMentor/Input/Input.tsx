import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Modal, Layout } from 'antd';
import ReactMarkdown from 'react-markdown/with-html';
import screenUrl from '../utils/screenUrl';

const InputMy = ({ form }): React.ReactElement => {
  const [visible, setVisible] = useState(false);
  const [visibleMd, setVisibleMd] = useState(false);
  const [visibleMdLoading, setVisibleMdLoading] = useState(false);
  const [description, setDescription] = useState(form.getFieldValue('span'));
  const { Content } = Layout;
  useEffect(() => {
    form.setFieldsValue({ span: `${description}` });
  }, [description, form]);

  const markDown = async (url: string) => {
    if (form.getFieldValue('markDownUrl')) {
      try {
        setVisibleMdLoading(true);
        const response = await fetch(url);
        const text = await response.text();
        setDescription(screenUrl(text, url));
        setVisibleMdLoading(false);
        setVisibleMd(false);
        form.setFieldsValue({ markDownUrl: '' });
      } catch (error) {
        console.log(error);
      }
    } else {
      setVisibleMd(false);
    }
  };

  return (
    <>
      <Form.Item name="span">
        <Layout className="layout">
          <Content style={{ padding: '0 50px' }}>
            <ReactMarkdown source={description} escapeHtml={false} />
          </Content>
        </Layout>
      </Form.Item>
      <Form.Item label="Input" name="Input">
        <Input.TextArea />
      </Form.Item>
      <Form.Item label="Button">
        <Button
          onClick={() => {
            console.log(form.getFieldValue('Input'));
            setDescription(`${description}\n${form.getFieldValue('Input')}`);
            form.setFieldsValue({ Input: '' });
          }}
          type="primary"
        >
          Add
        </Button>
        <Button
          onClick={() => {
            setVisible(!visible);
            form.setFieldsValue({ InputEdit: `${description}` });
          }}
          type="primary"
        >
          edit
        </Button>
        <Button type="dashed" onClick={() => setVisibleMd(!visibleMd)}>
          Dashed Button
        </Button>
        <Modal
          centered
          title="Basic Modal"
          visible={visible}
          onOk={() => {
            setVisible(!visible);
            setDescription(`${form.getFieldValue('InputEdit')}`);
            form.setFieldsValue({ InputEdit: '' });
          }}
          onCancel={() => setVisible(!visible)}
        >
          <Form.Item name="InputEdit">
            <Input.TextArea autoSize={{ minRows: 2, maxRows: 12 }} />
          </Form.Item>
        </Modal>
        <Modal
          centered
          title="MarkDown"
          visible={visibleMd}
          confirmLoading={visibleMdLoading}
          onOk={() => {
            markDown(`${form.getFieldValue('markDownUrl')}`);
          }}
          onCancel={() => setVisibleMd(!visibleMd)}
        >
          <Form.Item name="markDownUrl">
            <Input />
          </Form.Item>
        </Modal>
      </Form.Item>
    </>
  );
};
export default InputMy;
