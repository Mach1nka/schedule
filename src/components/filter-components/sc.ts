import styled from "styled-components";

export const FilterComponentSC = {
  BUTTON: styled.button`
    border: 0;
    background: inherit;

    &:hover {
      transition: 0.1s;
      border-bottom: 0;
      background: #f0f0f0;
    }

    &:hover + div {
      display: block;
    }
  `,

  MODAL_WINDOW: styled.div`
    display: none;
    position: absolute;
    padding: 20px;
    min-width: 200px;
    background-color: #f1f1f1;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;

    &:hover {
      display: flex;
    }
  `
}
