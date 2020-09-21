import styled from 'styled-components'

export const ScheduleButtonSC = {
  INPUT: styled.input`
    display: none;

    &:checked ~ label {
      z-index: 1;
      color: #1890ff;
      background: #fff;
      border-bottom: 1.5px solid #1890ff;
    }
  `,

  LABEL: styled.label`
    display: inline-block;
    height: 32px;
    padding: 0 15px;
    color: rgba(0, 0, 0, 0.65);
    line-height: 30px;
    background: #fff;
    border-top-width: 1.02px;
    cursor: pointer;
    -webkit-transition: color 0.3s, background 0.3s, border-color 0.3s;
    transition: color 0.3s, background 0.3s, border-color 0.3s;

    &:hover {
      color: #1890ff;
    }

    @media only screen and (max-width: 480px) {
      padding: 0 20px;
    }
  `
}


