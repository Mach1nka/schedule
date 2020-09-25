import React from 'react';
import { Form, Modal, Input, Button} from 'antd';

import { PlusCircleOutlined } from '@ant-design/icons';
import FeedbackBlockQuestion from './FeedbackBlockQuestion/FeedbackBlockQuestion';

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
        width="90%"
        onOk={() => {
          setVisible(!visible);
        }}
        onCancel={() => setVisible(!visible)}
      >
        <Form
          name="my"
          onFinish={onFinish}
          layout="vertical"
          form={form}
          initialValues={{
            feedback: ['', { 'Question: 1': ['jjknjjh'] }, { 'Question: 2': ['jjknjjh'] }],
          }}
        >
          <Form.List name="feedback">
            {(fields) => {
              return (
                <div>
                  {fields.reverse().map((field) =>
                    typeof form.getFieldValue('feedback')[field.name] === 'object' ? (
                      <Form.Item key={field.key} noStyle>
                        <FeedbackBlockQuestion name={field.name} form={form}/>
                      </Form.Item>
                    ) : (
                      <Form.Item key={0} label="Question">
                        {console.log(form.getFieldValue('feedback'))}
                        <Form.Item
                          fieldKey={[0]}
                          validateTrigger={['onChange', 'onBlur']}
                          isListField
                          name={[0]}
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
                                  [`Question: ${form.getFieldValue('feedback').length}`]: [
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
