import React from 'react';
import { Form, Select } from 'antd';
import { timeZones } from '../../../config';

const TimeZoneForm = (): React.ReactElement => {
  const { Option } = Select;

  return (
    <>
      <Form.Item name="timeZone" label="Time Zone">
        <Select>
          {timeZones.map((timeZone) => (
            <Option value={timeZone.TITLE} key={timeZone.TITLE}>
              {timeZone.TITLE}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
};
export default TimeZoneForm;
