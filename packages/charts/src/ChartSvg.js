// @flow
import styled, { css } from 'styled-components';

export default styled.svg.attrs(({ verticalAlignment: align }) => ({
  preserveAspectRatio: `xMidY${
    align === 'center' ? 'Mid' : align === 'start' ? 'Min' : 'Max'
  } meet`,
}))`
  ${({ maxWidth }) =>
    css`
      max-width: ${maxWidth}px;
    `};
  height: 100%;
  width: 100%;
  && {
    overflow: visible;
  }
`;
