// @flow
import * as React from 'react';
import { ActionButton } from '@seine/ui';
import {
  createTitleIdentityBlockElements,
  UPDATE_BLOCK_BODY,
} from '@seine/core';
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
 * @description Button that adds an element (to each group).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartElementAddButton({
  body,
  children = 'Add item',
  dispatch,
  format,
  id,
}: Props) {
  return (
    <ActionButton
      id={id}
      title={'Add element'}
      dispatch={dispatch}
      type={UPDATE_BLOCK_BODY}
      body={React.useMemo(
        () => ({
          elements: [
            ...body.elements,
            ...createTitleIdentityBlockElements(
              groupElements(body.elements).map(([group, { length }]) => ({
                group,
                title: `Item #${length}`,
                value: format.minValue || 0,
              }))
            ),
          ],
        }),
        [body.elements, format.minValue]
      )}
    >
      {children}
    </ActionButton>
  );
}
