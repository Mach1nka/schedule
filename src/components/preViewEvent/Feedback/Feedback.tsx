import React from 'react';
import { Form, Modal, Input, Button, Space } from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';

const Feedback = ({ visible, setVisible }): React.ReactElement => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log('Received values of form:', values);
  };
  return (
    <>
      <Modal
        centered
        title="Feedback"
        visible={visible}
        onOk={() => {
          setVisible(!visible);
        }}
        onCancel={() => setVisible(!visible)}
      >
        <Form
          name="my"
          onFinish={onFinish}
          form={form}
          initialValues={{
            feedback: ['', { 1: ['jjknjjh'] }, { 2: ['jjknjjh'] }],
          }}
        >
          <Form.List name="feedback">
            {(fields) => {
              return (
                <div>
                  {fields.reverse().map((field) =>
                    typeof form.getFieldValue('feedback')[field.name] === 'object' ? (
                      <Form.Item label="Question" key={field.name}>
                        <Form.List name={[field.name, field.name]} key={field.name}>
                          {(answers, { add }) => {
                            return (
                              <div>
                                {console.log(form.getFieldValue('feedback')[field.name])}
                                {answers.reverse().map((answer) => (
                                  <Form.Item label="answer" key={answer.name}>
                                    <Space>
                                      <Form.Item
                                        fieldKey={[answer.name]}
                                        isListField
                                        name={[answer.name]}
                                        noStyle
                                      >
                                        <span>ghjtjfgjgfjfgj</span>
                                      </Form.Item>
                                    </Space>
                                  </Form.Item>
                                ))}
                                <Form.Item label="answer">
                                  <PlusCircleOutlined
                                    className="dynamic-delete-button"
                                    style={{ margin: '0 8px' }}
                                    onClick={() => {
                                      add();
                                    }}
                                  />
                                </Form.Item>
                              </div>
                            );
                          }}
                        </Form.List>
                      </Form.Item>
                    ) : (
                      // <Form.Item label="Question" key={field.name}>
                      //   {console.log(form.getFieldValue('feedback'))}
                      //   <Space>
                      //     <Form.Item
                      //       fieldKey={[field.name]}
                      //       isListField
                      //       name={[field.name]}
                      //       noStyle
                      //     >
                      //       <span>{form.getFieldValue('feedback')[field.name]}</span>
                      //     </Form.Item>
                      //     <MinusCircleOutlined
                      //       onClick={() => {
                      //         remove(field.name);
                      //       }}
                      //     />
                      //   </Space>
                      // </Form.Item>
                      <Form.Item key={0} label="Question">
                        {console.log(form.getFieldValue('feedback'))}
                        <Form.Item
                          fieldKey={[0]}
                          validateTrigger={['onChange', 'onBlur']}
                          isListField
                          name={[0]}
                          rules={[
                            {
                              required: fields.length <= 1,
                              whitespace: true,
                              message: "Please input passenger's name or delete this field.",
                            },
                          ]}
                          noStyle
                        >
                          <Input placeholder="passenger name" style={{ width: '60%' }} />
                        </Form.Item>
                        <PlusCircleOutlined
                          className="dynamic-delete-button"
                          style={{ margin: '0 8px' }}
                          onClick={() => {
                            console.log(form.getFieldValue('feedback')[0]);
                            form.setFieldsValue({
                              feedback: [
                                '',
                                ...form.getFieldValue('feedback').filter((e, i) => i !== 0),
                                {
                                  [form.getFieldValue('feedback').length]: [
                                    form.getFieldValue('feedback')[0],
                                  ],
                                },
                              ],
                            });
                          }}
                        />
                      </Form.Item>
                    ),
                  )}
                </div>
              );
            }}
          </Form.List>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Feedback;
