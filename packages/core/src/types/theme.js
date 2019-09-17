// @flow
// https://material-ui.com/customization/default-theme/

export type Color = string;

export type Shadow = string;

export type Theme = {
  breakpoints: *,
  direction: *,
  mixins: *,
  palette: {
    type: 'light' | 'dark',
    common: {
      black: Color,
      white: Color,
    },
    text: {
      primary: Color,
      secondary: Color,
      disabled: Color,
      hint: Color,
    },
  },
  shadow: Shadow,
  typography: *,
  shape: *,
  transitions: *,
  zIndex: *,
};
