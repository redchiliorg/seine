// @flow
import styled, { css } from 'styled-components';

type Props = {
  fontSize: number,
  align: 'left' | 'center' | 'right',
  width?: 'auto' | number,
} & HTMLInputElement;

export default styled.input`
  background-color: transparent;
  border: none;
  && {
    margin: 0;
    padding: 0;
    ${({
      type,
      color = 'black',
      fontSize = '1em',
      width = 'auto',
      align = 'left',
    }: Props) => css`
      color: ${color};
      width: ${width};
      font-family: inherit;
      text-align: ${align};
      font-size: ${fontSize};
      margin-left: ${type === 'number' ? 7 : 0}px;
      max-width: 100%;
    `}
  }
`;
