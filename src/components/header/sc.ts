import styled from "styled-components";
import {Col, Image} from "antd";
import {Title} from "../../config"
import {breakPoints} from "../../styled-components/variables";

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
}
