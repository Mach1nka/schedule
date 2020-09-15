import React from 'react';
import { Form, Input, Button, Avatar, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const Organizer = ({ form }): React.ReactElement => {
  return (
    <>
      <Form.List name="organizers">
        {(fields, { remove }) => {
          return (
            <div>
              {fields.map((field) =>
                form.getFieldValue('organizers')[field.name].length >= 1 ? (
                  <Form.Item label="Organizer" key={field.name}>
                    <Form.Item fieldKey={[field.name]} isListField name={[field.name]} noStyle>
                      <Space>
                        <Avatar
                          src={`https://github.com/${
                            form.getFieldValue('organizers')[field.name]
                          }.png?size=32`}
                        />
                        <Button
                          type="link"
                          href={`https://github.com/${
                            form.getFieldValue('organizers')[field.name]
                          }`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {form.getFieldValue('organizers')[field.name]}
                        </Button>
                      </Space>
                    </Form.Item>
                    {fields.length > 1 ? (
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    ) : null}
                  </Form.Item>
                ) : (
                  <Form.Item key={0} label="Add organizer" required={fields.length <= 1}>
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
                      onClick={() =>
                        form.getFieldValue('organizers')[0].length > 0 &&
                        form.setFieldsValue({
                          organizers: ['', ...form.getFieldValue('organizers')],
                        })
                      }
                    />
                  </Form.Item>
                ),
              )}
            </div>
          );
        }}
      </Form.List>
    </>
  );
};
export default Organizer;
