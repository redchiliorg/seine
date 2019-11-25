// @flow
import styled from 'styled-components/macro';

export type Props = {
  children: string,
  textAlignment: 'left' | 'center' | 'right',
};

export default styled.h3`
  ${({ theme: { typography } }) => typography.h3};
  text-align: ${({ textAlignment }) => textAlignment};
  width: 100%;
`;
