import styled from "styled-components";
import {cssMixins} from "../../styled-components/mixins";
import {cssColors} from "../../styled-components/variables";

export const calendarDayEventsSC = {
  LIST: styled.ul`
    ${cssMixins.listReset};
  `,
  ITEM: styled.li`
    color: ${cssColors.LIGHT()};
    text-align: center;
    font-size: 0.75rem;
  `,
}
