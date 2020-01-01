// @flow
import styled, { css } from 'styled-components/macro';

const Typography = styled.p`
  ${({
    color,
    overflow = 'hidden',
    fontWeight,
    variant = 'body1',
    width,
    height,
    theme: {
      typography: {
        [variant]: { fontSize, lineHeight },
      },
    },
  }) => css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
    margin: 0;
    overflow: ${overflow};

    ${color &&
      css`
        color: ${color};
      `};

    ${fontWeight &&
      css`
        font-weight: ${fontWeight};
      `};

    ${typeof height === 'number' &&
      css`
        height: ${height + 2}px;
      `}
    ${typeof height === 'string' &&
      css`
        height: ${height};
      `}

    ${typeof width === 'number' &&
      css`
        width: ${width + 2}px;
      `}
    ${typeof width === 'string' &&
      css`
        width: ${width};
      `}
  `}
`;

export default Typography;
