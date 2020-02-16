// @flow
import styled from 'styled-components/macro';

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './constants';

const ChartSvg = styled.svg.attrs(
  ({
    overflow = 'visible',
    width = '100%',
    height = '90%',
    viewBox = `0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`,
  }) => ({ overflow, width, height, viewBox })
)`
  && {
    ${({ overflow, width, height }) => ({ overflow, width, height })};
  }
`;

export default ChartSvg;
