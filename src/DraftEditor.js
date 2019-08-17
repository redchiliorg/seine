// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Props as DraftProps } from './Draft';
import Draft from './Draft';
import { useBlockSelection } from './helpers';

type Props = $Rest<DraftProps, {| readOnly: boolean |}> & {
  id: string,
  onChange: Function,
  selected: boolean,
};

const Container = styled.div`
  border: ${({ selected }) =>
    selected ? '1px dashed blue' : '1px solid transparent'};
`;

/**
 * @description Draft block editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function DraftEditor({
  id,
  onChange,
  selected,
  children,
  ...draftProps
}: Props) {
  return (
    <Container {...useBlockSelection(selected, onChange, id)}>
      <Draft {...draftProps} readOnly={false}>
        {children}
      </Draft>
    </Container>
  );
}
