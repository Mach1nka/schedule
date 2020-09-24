import styled from 'styled-components';

interface background {
  colorSet: string | undefined; 
}

const colorSC ={
  COLOR: styled.div`
    width: 36px;
    height: 14px;
    border-radius: 2px;
    background-color: ${({ colorSet }: background) => `${colorSet}`};
  `,
  DIV: styled.div`
    padding: 5px;
    background: #fff;
    border-radius: 1px;
    box-shadow: 0 0 0 1px rgba(0,0,0,.1);
    display: inline-block;
    cursor: pointer;
`,
  COVER: styled.div`
    position: fixed;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
  `,
  POPOVER: styled.div`
    position: absolute;
    z-index: 2;
`
};
export default colorSC;