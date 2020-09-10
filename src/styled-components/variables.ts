export const cssColors = {
  LIGHT: (A?: number) => {
    return A
      ? `rgba(255, 255, 255${A ? `, ${A}` : `, 1`})`
      : `rgb(255, 255, 255)`;
  },
  DARK: (A?: number) => {
    return `rgba(0, 0 ,0${A ? `, ${A}` : `, 1`})`;
  },
}

export const breakPoints = {
  SCREEN_XS: 480,
  SCREEN_SM: 576,
  SCREEN_MD: 768,
  SCREEN_LG: 992,
  SCREEN_XL: 1200,
  SCREEN_XXL: 1600,
};
