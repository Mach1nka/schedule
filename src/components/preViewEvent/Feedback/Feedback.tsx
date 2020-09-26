import React,{ useContext } from 'react';
import { Form, Modal, Input, Button} from 'antd';
import { useSelector, useDispatch  } from 'react-redux';
import { PlusOutlined } from '@ant-design/icons';
import FeedbackBlockQuestion from './FeedbackBlockQuestion/FeedbackBlockQuestion';
import { selectUserRole } from '../../../selectors/selectors';
import {ReduxStateEntities} from "../../../reducers/reducers-config";
import {MainDataContext} from "../../../context/main-data-context";
import {dispatchEntityHelper} from "../../../helpers/dispatch-entity-helper/dispatch-entity-helper";


const Feedback = ({ visible, setVisible, event }): React.ReactElement => {
  const [form] = Form.useForm();
  const { putScheduleEvent, getScheduleEvents} = useContext(MainDataContext);
  const dispatch = useDispatch();
  const role = useSelector(selectUserRole);
  const onFinish = async(values, data) => {
    await dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENT_CURRENT, fetchFn: putScheduleEvent(data.id), data:{...data, feedbackComment: JSON.stringify(values.feedback)} , dispatch});
    dispatchEntityHelper({currentEntity: ReduxStateEntities.SCHEDULE_EVENTS, fetchFn: getScheduleEvents , dispatch});
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
          onFinish={(value)=>onFinish(value, event)}
          layout="vertical"
          form={form}
          initialValues={{
            feedback: event.feedbackComment ? JSON.parse(event.feedbackComment) : [''] 
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
                      role === 'student' && (
                      <Form.Item key={0} noStyle>
                        <Form.Item
                          label="Question"
                          fieldKey={[0]}
                          validateTrigger={['onChange', 'onBlur']}
                          isListField
                          name={[0]}
                          
                        >
                          <Input.TextArea placeholder="passenger name" style={{ width: '60%' }} autoSize={{ minRows: 1, maxRows: 6 }} allowClear/>
                        </Form.Item>
                        <Form.Item >
                          <Button 
                            type="primary" 
                            icon={<PlusOutlined/>}
                            onClick={() => {
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
                          >
                            Question
                          </Button>
                        </Form.Item>
                      </Form.Item>
                    )
                    ),
                  )}
                </div>
              );
            }}
          </Form.List>
          <Form.Item>
            <Button type="primary" htmlType="submit" >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default Feedback;
