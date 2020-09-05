export const cssColors = {
  LIGHT: (A?: number) => {
    return A
      ? `rgb(255, 255, 255${A ? `, ${A}` : ``})`
      : `rgb(255, 255, 255)`;
  },
};
