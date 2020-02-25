// @flow
import styled, { css } from 'styled-components/macro';

const ThemeWhiteBackingTwo = styled.div`
  ${({ theme: { bootstrap } }) => css`
    position: relative;
    background: ${bootstrap.white};
    border-radius: ${bootstrap.borderRadius}px;
    border: ${bootstrap.borderWidth}px solid ${bootstrap.borderColor};
    padding: 1.8rem 2rem;
  `}
`;

export default ThemeWhiteBackingTwo;
