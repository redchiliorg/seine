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
  
  ${({ x, y, size, width, height, maxWidth, maxHeight, fontSize }: Props) =>
    css`
      left: ${(x * maxWidth) / size}px;
      top: ${(y * maxHeight) / size}px;
      width: ${(width * maxWidth) / size}px;
      height: ${(height * maxHeight) / size}px;
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
