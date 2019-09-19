// @flow
import styled, { css } from 'styled-components';

export default styled.input.attrs(
  ({ className = 'mui-textfield', type = 'text', transparent }) => ({
    className,
    transparent,
    type,
  })
)`
  && {
    height: 32px;
    margin: 6px 8px;
    padding: 0 8px;
    ${({ type }) =>
      type === 'number' &&
      css`
        padding-right: 0;
        width: 5em;
      `};
  }
`;
