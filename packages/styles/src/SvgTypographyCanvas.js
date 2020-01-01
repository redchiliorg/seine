// @flow
import styled, { css } from 'styled-components/macro';

const SvgTypographyCanvas = styled.canvas.attrs(
  ({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: { fontSize, lineHeight },
      },
    },
    height = '100%',
    width = '100%',
  }) => ({
    fontSize,
    height,
    lineHeight,
    width,
  })
)`
  position: absolute;
  z-index: -1;

  ${({ fontSize, lineHeight }) => css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
  `}

  ${({ height = '100%', width = '100%' }) => css`
    height: ${height};
    width: ${width};
  `}
`;

export default SvgTypographyCanvas;
