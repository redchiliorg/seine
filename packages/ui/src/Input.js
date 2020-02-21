// @flow
import styled, { css } from 'styled-components/macro';

const Input = styled.input`
  ${({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: {
          fontFamily: defaultFontFamily,
          fontSize: defaultFontSize,
          fontWeight: defaultFontWeight,
          lineHeight,
        },
      },
    },
    fontFamily = defaultFontFamily,
    fontSize = defaultFontSize,
    fontWeight = defaultFontWeight,
  }) => css`
    font-weight: ${fontWeight};
    font-family: ${fontFamily};
    font-size: ${fontSize};
    line-height: ${lineHeight};
    ${({ color }) => color && { color }};
    ${({ fontWeight }) => fontWeight && { fontWeight }};
    ${({ width }) => width && { width }};
    ${({ height }) => height && { height }};
    ${({ textAlign }) => textAlign && { textAlign }};
  `}
`;

export default Input;
