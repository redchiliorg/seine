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
    ${({ type, fontSize = 1, width = 'auto', align = 'left' }: Props) => css`
      width: ${width};
      font-family: inherit;
      text-align: ${align};
      font-size: ${fontSize}em;
      margin-left: ${type === 'number' ? 7 : 0}px;
      max-width: 100%;
    `}
  }
`;
