// @flow
import * as React from 'react';
import { groupElements, titleIdentityElements } from '@seine/charts';
import { ActionButton } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';
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
 * @description Button that adds group by copying existent.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartGroupAddButton({
  id,
  children = 'Add group',
  dispatch,
  format,
  body,
}) {
  const { length: groupsCount } = groupElements(body.elements);
  return (
    <ActionButton
      id={id}
      title={'Add group'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={React.useMemo(
        () => ({
          elements: [
            ...body.elements,
            ...titleIdentityElements(body.elements).map(({ id, title }) => ({
              id,
              title,
              group: `Group #${groupsCount + 1}`,
              value: format.minValue || 0,
            })),
          ],
        }),
        [body.elements, format.minValue, groupsCount]
      )}
    >
      {children}
    </ActionButton>
  );
}
