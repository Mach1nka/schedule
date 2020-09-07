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
          <Select size="middle" defaultValue="Student" >
            <Option value="Student">Student</Option>
            <Option value="Mentor">Mentor</Option>
          </Select>
        </Col>
      </Row>
    </header>
  );
};

export default Header;