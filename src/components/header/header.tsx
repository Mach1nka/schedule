import * as React from "react";
import { Row, Col, Image, Radio, Select } from "antd";
import {Title, Option, TIMEZONES} from "../../config"


const Header: React.FC = () => {

  return (
    <header>
      <Row>
        <Col span={8}>
          <div>
            <Image
              width={83}
              src="https://app.rs.school/static/images/logo-rsschool3.png"
              alt="RSS logo"
            />
          </div>
          <div>
            <Select size="large" defaultValue={'4'} style={{ width: 200, marginTop: 30 }}>
              {TIMEZONES.map((item, index)=>{
                return(
                  <Option key={index}>{item}</Option>
                )
              })}
            </Select>
          </div>
          

        </Col>
        <Col span={8}><Title>Schedule</Title></Col>
        <Col span={8}>
          <Radio.Group defaultValue="student" size="large">
            <Radio.Button value="student">Student</Radio.Button>
            <Radio.Button value="mentor">Mentor</Radio.Button>
          </Radio.Group>
        </Col>
      </Row>
    </header>
  );
};

export default Header;