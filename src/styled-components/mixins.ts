export const cssMixins = {
  buttonReset: (): string => {
    return (`
      padding: 0;
      border: none;
      background-color: transparent;
      cursor: pointer;`
    )
  },
  listReset: (): string => {
    return (`
        padding: 0;
        margin: 0;
        list-style: none`
    )
  },
  visuallyHidden: (): string => (`
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    border: 0;
    padding: 0;
    white-space: nowrap;
    clip-path: inset(100%);
    clip: rect(0 0 0 0);
    overflow: hidden;
    `
  ),
};
