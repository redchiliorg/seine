// @flow
import styled, { css } from 'styled-components';

export default styled.svg.attrs(
  ({
    verticalAlignment: align,
    meetOrSlice = 'meet',
    textAlignment = 'center',
  }) => ({
    preserveAspectRatio: `x${
      textAlignment === 'center'
        ? 'Mid'
        : textAlignment === 'left'
        ? 'Min'
        : 'Max'
    }Y${
      align === 'center' ? 'Mid' : align === 'start' ? 'Min' : 'Max'
    } ${meetOrSlice}`,
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

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px;
    `};
`;
