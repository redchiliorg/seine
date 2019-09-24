// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import { groupElements } from '@seine/charts';
import type {
  BlockId,
  ChartBody,
  ChartFormat,
  EditorAction,
} from '@seine/core';

type Props = {
  body: ChartBody,
  children?: string,
  dispatch: (EditorAction) => any,
  format: ChartFormat,
  id: BlockId,
};

/**
 * @description Button that removes last element (of each group).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function RemoveColumnChartElementButton({
  body,
  children = 'Rm item',
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
          elements: groupElements(body.elements).reduce(
            (acc, [_, elements]) => [...acc, ...elements.slice(0, -1)],
            []
          ),
        }),
        [body.elements]
      )}
    >
      {children}
    </ActionButton>
  );
}
