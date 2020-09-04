import * as React from "react";
import { Row, Col, Typography, Image, Radio } from "antd";



const Header: React.FC = () => {
  const { Title } = Typography;
  const timezone = [];
  for (let i = 0; i < 9; i++) {
    timezone.push(<Option key={i}>{`GMT + ${i}`}</Option>);
  }
  console.log(timezone)

  return (
    <header>
      <Row>
        <Col span={8}>
          <Image
            width={83}
            src="https://app.rs.school/static/images/logo-rsschool3.png"
            alt="RSS logo"
          />
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