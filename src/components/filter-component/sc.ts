import styled from 'styled-components';

export const FilterComponentSC = {
  BUTTON: styled.button`
    background: inherit;
    border: none;
    cursor: pointer;

    &:hover {
      background: #f0f0f0;
    }

    &:hover ~ div {
      display: block;
    }
  `,

  DIV: styled.div`
    display: none;
    position: absolute;
    left: 15px;
    z-index: 1;
    min-width: 200px;
    padding: 20px;
    background: #fafafa;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);

    &:hover {
      display: block;
      background: #f0f0f0;
      cursor: pointer;
    }
  `
}
