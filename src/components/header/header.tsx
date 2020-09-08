import * as React from "react";
import { Row, Col, Image, Select } from "antd";
import {Title, Option, TIMEZONES, LOGO} from "../../config"


const Header: React.FC = () => {

  return (
    <header>
      <Row>
        <Col xs={12} lg={8}>
          <Image
            width={LOGO.width}
            src={LOGO.src}
            alt={LOGO.alt}
          />
        </Col>

        <Col xs={{ span: 24, order: 3, }} lg={{ span: 8, order: 2}}><Title className="header__title" level={2}>Schedule</Title></Col>

        <Col className="header__role" xs={{ span: 12, order: 2 }} lg={{ span: 8, order: 3 }} >
          <Select size="large" defaultValue="Student" >
            <Option value="Student">Student</Option>
            <Option value="Mentor">Mentor</Option>
          </Select>
        </Col>

        <Col xs={{ span: 24, order: 4 }} lg={{ span: 8, order: 4 }}>
          <Select size="large" defaultValue="Europe/Minsk" style={{ width: 200 }}>
            {TIMEZONES.map((item)=>{
              return(
                <Option value={item} key={item}>{item}</Option>
              )
            })}
          </Select>
        </Col>
      </Row>
    </header>
  );
};

export default Header;