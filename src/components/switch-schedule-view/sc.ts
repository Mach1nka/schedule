import styled from "styled-components";

export const SwitchScheduleView = {
  UL: styled.ul`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;

    @media only screen and (max-width: 480px) {
      justify-content: center;
      padding-inline-start: 0;
    }
  `,

  LI: styled.li`
    list-style-type: none;
    margin-left: 7px;

    @media only screen and (max-width: 480px) {
      margin: 0 5px;
    }
  `,
}
