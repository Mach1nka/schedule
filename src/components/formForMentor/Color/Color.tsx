import React, { useState } from 'react';
import { Form, Space, Tag } from 'antd';
import { SketchPicker } from 'react-color';
import SC from './sc';

const Color = ({form}): React.ReactElement => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState(`${form.getFieldValue('color') ? form.getFieldValue('color') : 'rgba(10, 10, 10, 1)'}`);

  const handleChange = (color: any) => {    
    const{r, g, b, a} = color.rgb;
    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
    form.setFieldsValue({
      color: `rgba(${r}, ${g}, ${b}, ${a})`,
    })
  };

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker)
  };

  const handleClose = () => {
    setDisplayColorPicker(false)
  };
  return (
    <>
      <Form.Item label="Color">
        {console.log(form.getFieldValue('color'))        }
        <Space>
          <SC.DIV>
            <Form.Item name="color" noStyle rules={[{ required: true }]}>
              <SC.COLOR colorSet={color} onClick={handleClick}/>
            </Form.Item>
          </SC.DIV>
          <Form.Item noStyle>
            <Tag color="blue">{form.getFieldValue('color') ? form.getFieldValue('color') : 'Null'}</Tag>
          </Form.Item>
        </Space>
        {displayColorPicker && (
        <SC.POPOVER>
          <SC.COVER onClick={handleClose}/>
          <SketchPicker color={color} onChange={handleChange}/>
        </SC.POPOVER>
        )}
      </Form.Item>
    </>
  );
};
export default Color;
