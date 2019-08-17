// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Props as PeiProps } from './Pie';
import { useBlockSelection } from './helpers';
import Pie from './Pie';

type Props = PeiProps & {
  id: string,
  onChange: Function,
  selected: boolean,
};

const Container = styled.div`
  border: ${({ selected }) =>
    selected ? '1px dashed blue' : '1px solid transparent'};
`;

/**
 * @description Pie editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export function PieEditor({
  id,
  onChange,
  selected,
  children,
  ...pieProps
}: Props) {
  return (
    <Container {...useBlockSelection(selected, onChange, id)}>
      <Pie {...pieProps}>{children}</Pie>
    </Container>
  );
}
