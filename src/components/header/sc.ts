import styled from "styled-components";
import {Col, Image, Select} from "antd";
import {breakPoints} from "../../styled-components/variables";
import Title from "antd/lib/typography/Title";

export const headerSC = {
  TITLE: styled(Title)`
    text-align: left;

    @media (min-width: ${breakPoints.SCREEN_LG}px) {
      text-align: center;
    }
  `,
  LOGO: styled(Image)`
    width: 100px;
`,
  ROLE: styled(Col)`
    text-align: right;
  `,
  TIME_ZONE_SELECT: styled(Select)`
    width: 200px;
  `,
}
