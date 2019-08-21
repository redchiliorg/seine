// @flow
import * as React from 'react';
import styled from 'styled-components';

import type { Props as DraftProps } from './Draft';
import Draft from './Draft';
import { useBlockSelection } from './helpers';
import { UPDATE_BLOCK_DATA } from './reducers/content';

type Props = $Rest<DraftProps, {| readOnly: boolean, onChange: * |}> & {
  id: string,
  dispatch: Function,
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
  dispatch,
  selected,
  children,
  ...draftProps
}: Props) {
  return (
    <Container {...useBlockSelection(id, dispatch, selected)}>
      <Draft
        {...draftProps}
        onChange={React.useCallback(
          (body) => {
            dispatch({ type: UPDATE_BLOCK_DATA, data: { body } });
          },
          [dispatch]
        )}
        readOnly={false}
      >
        {children}
      </Draft>
    </Container>
  );
}
