// @flow
import styled from 'styled-components';

export default styled.svg.attrs(({ verticalAlignment: align }) => ({
  preserveAspectRatio: `xMidY${
    align === 'center' ? 'Mid' : align === 'start' ? 'Min' : 'Max'
  } meet`,
}))`
  height: 100%;
  width: 100%;
`;
