// @flow
import defaultTheme from '../defaultTheme';

const theme = {
  ...defaultTheme,
  typography: {
    ...defaultTheme.typography,
    body1: defaultTheme.typography.h5,
    body2: defaultTheme.typography.body1,
    h6: defaultTheme.typography.h5,
  },
  bootstrap: {
    primary: '#71A2FF',
    secondary: '#C0D4E2',
    success: '#8ADB96',
    warning: '#FDE876',
    danger: '#FF7171',

    light: '#F7F7F7',

    gray: '#ACBECB',
    dark: '#454544',
    white: '#FFFFFF',
    green: '#8ADB96',
    greenLight: '#DAEBD1',
    yellow: '#FDE876',
    yellowLight: '#FEF1C6',
    red: '#FF7171',
    redLight: '#FFDBDB',

    borderRadius: '.3rem',
    borderWidth: 1,
    borderColor: '#EBEBEB',
    gridColumns: 12,
    gridGutterWidth: 40,

    btnPaddingY: '1.2rem',
    btnPaddingX: '2rem',
    btnLineHeight: '1.2rem',
    btnFontWeight: 500,
    btnBoxShadow: 'none',
    btnDisabledOpacity: 0.65,
    btnActiveBoxShadow: 'none',
    btnLnkDisabledColor: '#ACBECB',

    spacers: {
      1: spacer(0.25),
      2: spacer(0.5),
      3: spacer(1),
      4: spacer(1.5),
      5: spacer(2),
      6: spacer(2.5),
      7: spacer(3),
      8: spacer(4),
      9: spacer(5),
      10: spacer(6),
      11: spacer(7),
      12: spacer(8),
      13: spacer(9),
      14: spacer(10),
      15: spacer(11),
      16: spacer(12),
      17: spacer(13),
      18: spacer(14),
      19: spacer(15),
    },
  },
};

export type Spacer =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18
  | 19;

/**
 * @description Compute bootstrap spacer value.
 * @param {number} factor
 * @param {?number} spacerValue
 * @param {?number} spacerUnit
 * @returns {string}
 */
function spacer(factor, spacerValue = 1, spacerUnit = 'rem') {
  return `${spacerValue * factor}${spacerUnit}`;
}

export default theme;
