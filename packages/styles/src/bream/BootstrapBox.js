// @flow
import { reject, map, mapObjIndexed, o, test, isNil } from 'ramda';
import styled from 'styled-components/macro';

import type { Spacer } from './theme';

export type SpacerProps = {
  marginTop: Spacer,
  marginLeft: Spacer,
  marginBottom: Spacer,
  marginRight: Spacer,

  paddingTop: Spacer,
  paddingLeft: Spacer,
  paddingBottom: Spacer,
  paddingRight: Spacer,
};

export type Props = SpacerProps & {
  position: 'static' | 'relative' | 'absolute' | 'fixed',

  width?: number | string,
  height?: number | string,
};

const isSpacerPropertyName: (string) => boolean = test(
  /^(margin|padding)(Top|Left|Bottom|Right)$/g
);

const filterSpacerProperties: (Props) => SpacerProps = o(
  reject(isNil),
  mapObjIndexed((value, name) => (isSpacerPropertyName(name) ? value : null))
);

const BootstrapBox = styled.div`
  ${({ position }: Props) => position && { position }};

  ${({ width }: Props) => width && { width }};
  ${({ height }: Props) => height && { height }};

  ${({ theme: { bootstrap }, ...props }) =>
    map((spacer) => bootstrap.spacers[spacer], filterSpacerProperties(props))}
`;

export default BootstrapBox;
