import styled from "styled-components";
import { Tabs } from 'antd';

export const SwitchScheduleViewSC = {
  TABS: styled(Tabs)`
    & > div > div {
      display: flex;
      justify-content: flex-end;
    }
  `
}
