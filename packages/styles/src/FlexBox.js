// @flow
import styled, { css } from 'styled-components';

const FlexBox = styled.div`
  display: flex;
  position: relative;
  ${({ height }) =>
    typeof height === 'number'
      ? css`
          height: ${height}px;
        `
      : height &&
        css`
          height: ${height};
        `}
  ${({ width }) =>
    typeof width === 'number'
      ? css`
          width: ${width}px;
        `
      : width &&
        css`
          width: ${width};
        `}
`;

export default FlexBox;
