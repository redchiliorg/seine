// @flow
import styled, { css } from 'styled-components/macro';

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
        ? 'Max'
        : textAlignment === 'left'
        ? 'Min'
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
  ${({ minWidth = null }) =>
    minWidth !== null
      ? css`
          min-width: ${minWidth}px;
          width: auto;
        `
      : css`
          width: 100%;
        `}

  ${({ minHeight = null }) =>
    minHeight !== null
      ? css`
          min-height: ${minHeight}px;
          height: auto;
        `
      : css`
          height: 100%;
        `}
`: (props: Props) => React.Node);
