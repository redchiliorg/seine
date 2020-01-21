// @flow
import styled, { css } from 'styled-components';

export default styled.svg.attrs(
  ({
    verticalAlignment: align = 'center',
    textAlignment = 'center',
    meetOrSlice = 'meet',
    preserveAspectRatio = `x${
      textAlignment === 'center'
        ? 'Mid'
        : textAlignment === 'left'
        ? 'Min'
        : 'Max'
    }Y${
      align === 'center' ? 'Mid' : align === 'start' ? 'Min' : 'Max'
    } ${meetOrSlice}`,
    height = '100%',
    width = '100%',
  }) => ({ preserveAspectRatio, width, height })
)`
  ${({ minWidth = null, width }) =>
    minWidth !== null
      ? css`
          min-width: ${minWidth}px;
          width: auto;
        `
      : css`
          width: ${width};
        `}

  ${({ minHeight = null, height }) =>
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
