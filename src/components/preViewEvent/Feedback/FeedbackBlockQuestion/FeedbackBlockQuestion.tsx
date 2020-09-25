import React from 'react';
import { Form, Input, Button, Tag, Layout, Space  } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors/selectors';

const FeedbackBlockQuestion = ({name, form}): React.ReactElement => {
  const role = useSelector(selectUserRole);
  const { Content } = Layout;
  console.log(role);
  
  return (
    <Form.List name={[name, `Question: ${name}`]} key={name}>
      {(fields, { add, remove }) => {
          return (
            <div>
              {fields.length > 0 && (
              <Layout style={{ padding: '12px 12px', marginBottom: '12px' }}>
                <Content>
                  {fields.map((field) => (
                    <Form.Item
                      key={field.name}
                      label={field.name === 0 ? <Tag color="red">Question:</Tag> : <Tag color="green">Answer:</Tag>}
                    >
                      <Space>
                        <Form.Item
                          fieldKey={[field.name]}
                          isListField
                          name={[field.name]}
                          noStyle
                        >
                          <span>{form.getFieldValue('feedback')[name][`Question: ${name}`][field.name]}</span>
                        </Form.Item>
                        <MinusCircleOutlined
                          onClick={() => {
                      remove(field.name);
                      }}
                        />
                      </Space>
                    </Form.Item>
                ))}
                </Content>
              </Layout>
            )}
              { fields.length > 0 && role === 'mentor' && (
              <>
                <Form.Item
                  label="Answer"
                  fieldKey={['answer', 0]}
                  validateTrigger={['onChange', 'onBlur']}
                  isListField
                  name={['answer', 0]}
                >
                  <Input.TextArea placeholder="passenger name" style={{ width: '60%' }} autoSize={{ minRows: 1, maxRows: 6 }} allowClear/>
                </Form.Item>
                <Form.Item >
                  <Button 
                    type="primary" 
                    icon={<PlusOutlined/>}
                    onClick={() => {
                  add(form.getFieldValue('feedback')[name][`Question: ${name}`].answer);
                }}
                  >
                    Answer
                  </Button>
                </Form.Item>
              </>
            )}
              
            </div>
          );
        }}
    </Form.List>      
  );
};
export default FeedbackBlockQuestion;