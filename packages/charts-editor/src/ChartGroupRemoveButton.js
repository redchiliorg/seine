// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { groupElements } from '@seine/charts';
import type {
  BlockId,
  ChartBody,
  ChartFormat,
  BlocksAction,
} from '@seine/core';

type Props = {
  body: ChartBody,
  children?: string,
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  id: BlockId,
};

/**
 * @description Button that removes elements of a group.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartGroupRemoveButton({
  body,
  children = 'Rm group',
  dispatch,
  id,
}: Props) {
  return (
    <ActionButton
      id={id}
      title={'Remove element'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={React.useMemo(
        () => ({
          elements: groupElements(body.elements)
            .slice(0, -1)
            .reduce((acc, [_, elements]) => [...acc, ...elements], []),
        }),
        [body.elements]
      )}
    >
      {children}
    </ActionButton>
  );
}
