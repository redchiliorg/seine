// @flow
import styled, { css } from 'styled-components';

type Props = {
  [
    | 'x'
    | 'y'
    | 'size'
    | 'width'
    | 'height'
    | 'maxWidth'
    | 'maxHeight'
    | 'fontSize']: number,
  columns?: boolean,
  justify?: 'flex-start' | 'space-evenly' | 'center',
};

export default styled.div`
  display: flex;
  position: absolute;
  
  ${({ x, y, size, width, height, maxWidth, maxHeight }: Props) =>
    css`
      left: ${(x * maxWidth) / size}px;
      top: ${(y * maxHeight) / size}px;
      width: ${(width * maxWidth) / size}px;
      height: ${(height * maxHeight) / size}px;
    `}
  ${({ size, maxWidth, fontSize }: Props) =>
    fontSize &&
    css`
      font-size: ${(fontSize * maxWidth) / size}px;
    `}
  
  ${({ columns = false }: Props) =>
    columns &&
    css`
      flex-direction: column;
    `}
  
  ${({ justify = 'flex-start' }: Props) =>
    css`
      justify-content: ${justify};
    `}
`;
