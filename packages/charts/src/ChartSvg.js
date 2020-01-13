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
  ${({ minWidth = null, width = '100%' }) =>
    minWidth !== null
      ? css`
          min-width: ${minWidth}px;
          width: auto;
        `
      : css`
          width: ${width};
        `}

  ${({ minHeight = null, height = '100%' }) =>
    minHeight !== null
      ? css`
          min-height: ${minHeight}px;
          height: auto;
        `
      : css`
          height: ${height};
        `}

  ${({ maxWidth }) =>
    maxWidth &&
    css`
      max-width: ${maxWidth}px;
    `};
`;
