import styled, { css } from 'styled-components';

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
    overflow: ${overflow};
    text-overflow: ellipsis;
    white-space: pre;

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
        height: ${height}px;
      `}
    ${typeof height === 'string' &&
      css`
        height: ${height};
      `}
    
    ${typeof width === 'number' &&
      css`
        width: ${width}px;
      `}
    ${typeof width === 'string' &&
      css`
        width: ${width};
      `}
  `}
`;

export default Typography;
