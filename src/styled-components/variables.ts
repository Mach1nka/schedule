export const cssColors = {
  LIGHT: (A?: number) => {
    return A
      ? `rgba(255, 255, 255${A ? `, ${A}` : `, 1`})`
      : `rgb(255, 255, 255)`;
  },
  DARK: (A?: number) => {
    return `rgba(0, 0 ,0${A ? `, ${A}` : `, 1`})`;
  },
};
