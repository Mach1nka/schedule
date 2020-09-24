import React from 'react';
import { DatePicker, Form, Space, Button } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const DateMy = ({ type }): React.ReactElement => {
  const { RangePicker } = DatePicker;
  return (
    <>
      <Form.Item label="Date Task" name="date" rules={[{ required: true }]}>
        <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
      </Form.Item>
      {JSON.parse(type.crossCheck) && (
        <Form.List name="crossCheck">
          {(fields, { add, remove }) => {
            return (
              <div>
                <Form.Item label="CrossCheck">
                  {fields.map((field) => (
                    <Space key={field.key}>
                      <Form.Item
                        key={field.key}
                        name={[field.name]}
                        fieldKey={[field.fieldKey]}
                        noStyle
                      >
                        <RangePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
                      </Form.Item>
                      <MinusCircleOutlined
                        className="dynamic-delete-button"
                        style={{ margin: '0 8px' }}
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    </Space>
                  ))}

                  {fields.length < 1 ? (
                    <Form.Item noStyle>
                      <Button type="dashed" onClick={() => add()} block>
                        <PlusOutlined /> Add CrossCheck
                      </Button>
                    </Form.Item>
                  ) : null}
                </Form.Item>
              </div>
            );
          }}
        </Form.List>
      )}
    </>
  );
};
export default DateMy;
