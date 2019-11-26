import styled, { css } from 'styled-components';

const Text = styled.p`
  ${({
    variant = 'body1',
    theme: {
      typography: {
        [variant]: { fontSize, lineHeight },
      },
    },
    width,
  }) => css`
    font-size: ${fontSize};
    line-height: ${lineHeight};
    height: ${parseFloat(fontSize) * lineHeight}rem;
    width: ${width};
  `}
`;

export default Text;
