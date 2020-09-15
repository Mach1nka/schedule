import React from 'react';
import { Form, Button, Row, Col } from 'antd';
import moment from 'moment';
import Date from './Date/Date';
import Organizer from './Organizer/Organizer';
import InputMy from './Input/Input';
import FormHeader from './FormHeader/FormHeader';

const FormMy = (): React.ReactElement => {
  const dateFormat = 'YYYY-MM-DD HH:mm';
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };
  const [form] = Form.useForm();
  return (
    <Row justify="center">
      <Col span={20}>
        <Form
          form={form}
          layout="horizontal"
          name="validate_other"
          labelCol={{ span: 5 }}
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 2 },
          }}
          onFinish={onFinish}
          initialValues={{
            date: [moment('2015-06-06 00:34', dateFormat), moment('2015-07-06 00:45', dateFormat)],
            organizers: [''],
            crossCheck: [
              [moment('2015-06-06 00:34', dateFormat), moment('2015-07-06 00:45', dateFormat)],
            ],
            type: 'task',
            span: `## Цели задания\n**Практические**\n- собрать идеи для улучшения расписания RS School\n- создать удобное, функциональное расписание\n- интегрировать лучшее решение в rs app`,
          }}
        >
          <FormHeader />
          <Organizer form={form} />
          <Date />
          <InputMy form={form} />
          <Form.Item wrapperCol={{ span: 12, offset: 6 }} name="submit">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
export default FormMy;
