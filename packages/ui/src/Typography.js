import styled, { css } from 'styled-components';

const Typography = styled.p`
  ${({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: { fontSize, lineHeight },
      },
    },
    fontWeight,
    color,
    overflow = 'hidden',
    transform,
    width,
  }) => css`
    font-size: ${fontSize};
    ${fontWeight &&
      css`
        font-weight: ${fontWeight};
      `};
    line-height: ${lineHeight};
    overflow: ${overflow};
    ${transform &&
      css`
        transform: ${transform};
        transform-origin: left top;
      `};
    white-space: pre;
    ${color &&
      css`
        color: ${color};
      `};
    width: ${+width
      ? width + 'px'
      : typeof width === 'string'
      ? width
      : 'auto'};
  `}
`;

export default Typography;
