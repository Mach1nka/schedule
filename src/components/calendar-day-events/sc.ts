import styled from "styled-components";
import {cssMixins} from "../../styled-components/mixins";
import {cssColors} from "../../styled-components/variables";

export const calendarDayEventsSC = {
  LIST: styled.div`
    ${cssMixins.listReset};
  `,
  ITEM: styled.button`
    color: ${cssColors.LIGHT()};
    text-align: center;
    font-size: 0.75rem;
    white-space: nowrap;
    outline: none;
    border: none;
    width: 100%;
  `,
}
