import styled from 'styled-components';

export const FilterComponentSC = {
  BUTTON: styled.button`
    background: inherit;
    border: none;
    cursor: pointer;

    &:hover ~ div {
      display: flex;
    }
  `,

  P: styled.p`
    display: flex;
    justify-content: center;
    margin-bottom: 0px;
  `,

  INPUT_BLOCK: styled.div`
    display: flex;
    flex-direction: column;
    margin: 5px;
  `,

  DIV: styled.div`
    display: none;
    position: absolute;
    left: 15px;
    z-index: 1;
    border-radius: 3px;
    min-width: max-content;
    padding: 5px;
    background: #ffff;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.5);

    &:hover {
      transition: 0.3s;
      display: flex;
      flex-direction: row;
      background: #fafafa;
      cursor: pointer;
    }
  `
}
