import styled, { css } from 'styled-components';

const Text = styled.p`
  ${({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: { fontSize, lineHeight },
      },
    },
    transform = '',
    width,
  }) => css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
    overflow: hidden;
    transform: ${transform};
    transform-origin: left top;
    white-space: pre;
    width: ${+width
      ? width + 'px'
      : typeof width === 'string'
      ? width
      : 'auto'};
  `}
`;

export default Text;
