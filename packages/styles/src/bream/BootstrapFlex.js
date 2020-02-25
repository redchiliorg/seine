// @flow
import styled from 'styled-components/macro';

import BootstrapBox from './BootstrapBox';

export type Props = {
  alignItems?: 'flex-start' | 'center' | 'flex-end',
  flexWrap?: 'wrap' | 'nowrap',
  justifyContent?: 'flex-start' | 'center' | 'between' | 'flex-end',
  height?: number | string,
  width?: number | string,
};

const BootstrapFlex = styled(BootstrapBox)`
  display: flex;
  ${({ alignItems }) => alignItems && { alignItems }};
  ${({ justifyContent }) => justifyContent && { justifyContent }};
  ${({ flexWrap }) => flexWrap && { flexWrap }};
`;

export default BootstrapFlex;
