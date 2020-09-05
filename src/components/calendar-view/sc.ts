import styled from "styled-components";
import {Card} from "antd";

export const calendarViewSC = {
  DAY_CONTAINER: styled(Card)`
    height: 90px;
    text-align: center;

    & > div {
      padding: 0;
    }
  `,
}
