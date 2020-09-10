import styled from "styled-components";
import {Card} from "antd";
import {cssColors} from "../../styled-components/variables";

export const calendarViewSC = {
  DAY_CONTAINER: styled(Card)`
    height: 90px;
    text-align: center;
    overflow-y: auto;

    & > div {
      padding: 0;
    }

    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 2px;
      background-color: ${cssColors.DARK(0.6)};
      -webkit-box-shadow: 0 0 1px ${cssColors.LIGHT(0.2)};
    }
  `,
}
