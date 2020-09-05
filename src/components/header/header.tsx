import * as React from "react";
import { Row, Col, Image, Radio, Select } from "antd";
import {Title, Option, TIMEZONES, LOGO} from "../../config"


const Header: React.FC = () => {

  return (
    <header>
      <Row>
        <Col span={8}>
          <div>
            <Image
              width={LOGO.width}
              src={LOGO.src}
              alt={LOGO.alt}
            />
          </div>
          <div>
            <Select size="large" defaultValue="Europe/Minsk" style={{ width: 200, marginTop: 30 }}>
              {TIMEZONES.map((item)=>{
                return(
                  <Option value={item} key={item}>{item}</Option>
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