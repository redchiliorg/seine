// @flow
import styled from 'styled-components';

export default styled.button`
  color: ${({ opacity = 0.75 }) => `rgb(255, 255, 255, ${opacity})`};
  background-color: ${({
    color,
    opacity = 0.75,
  }: {
    opacity: number,
    color?: 'danger' | 'primary',
  }) =>
    color === 'danger'
      ? `rgb(128, 0, 0, ${opacity})`
      : color === 'primary'
      ? `rgb(0, 0, 0, ${opacity})`
      : `rgb(50, 50, 50, ${opacity})`};
  border-radius: 4px;
  padding: 0.07em 0.5em;
  :hover {
    opacity: 0.75;
  }
`;
