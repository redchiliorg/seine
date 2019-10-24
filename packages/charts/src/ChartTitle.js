// @flow
import styled from 'styled-components/macro';

export type Props = {
  children: string,
  textAlignment: 'left' | 'center' | 'right',
};

export default styled.h1`
  text-align: ${({ textAlignment }) => textAlignment};
  width: 100%;
`;
