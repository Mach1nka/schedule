import styled from "styled-components";
import {cssMixins} from "../../styled-components/mixins";
import {cssColors} from "../../styled-components/variables";

export const calendarDayEventsSC = {
  LIST: styled.div`
    ${cssMixins.listReset};
  `,
  ITEM: styled.button`
    background-color: ${props => props.color};
    font-weight: 500;
    text-align: center;
    font-size: 0.9rem;
    white-space: nowrap;
    outline: none;
    border: none;
    width: auto;
    min-width: 100%;
    cursor:pointer;
  `,
}
