// @flow
import styled from 'styled-components/macro';

const SvgTypographyForeign = styled.foreignObject`
  && {
    pointer-events: none;
  }
  p,
  input {
    pointer-events: all;
  }
`;

export default SvgTypographyForeign;
