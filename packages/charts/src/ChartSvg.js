// @flow
import styled from 'styled-components';

import { VIEWPORT_HEIGHT, VIEWPORT_WIDTH } from './constants';

export type Props = {
  textAlignment: 'left' | 'center' | 'right',
  viewBox?: 'square' | 'landscape' | 'portrait',
  verticalAlignment: 'start' | 'center' | 'end',
  meetOrSlice: 'meet' | 'slice',
};

export default (styled.svg.attrs(
  ({
    meetOrSlice = 'meet',
    textAlignment = 'center',
    verticalAlignment: align = 'end',
    preserveAspectRatio = `x${
      textAlignment === 'right'
        ? 'Min'
        : textAlignment === 'left'
        ? 'Max'
        : 'Mid'
    }Y${
      align === 'center' ? 'Mid' : align === 'start' ? 'Min' : 'Max'
    } ${meetOrSlice}`,
    viewBox,
  }: Props) => ({
    preserveAspectRatio,
    ...(viewBox && {
      viewBox:
        viewBox === 'landscape'
          ? `0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_HEIGHT}`
          : viewBox === 'portrait'
          ? `0 0 ${VIEWPORT_HEIGHT} ${VIEWPORT_WIDTH}`
          : viewBox === 'square'
          ? `0 0 ${VIEWPORT_WIDTH} ${VIEWPORT_WIDTH}`
          : viewBox,
    }),
  })
)`
  height: 100%;
  width: 100%;
`: (props: Props) => React.Node);
