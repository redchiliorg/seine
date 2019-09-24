// @flow
import { Input, Label } from '@seine/ui';
import type {
  BlockId,
  ChartBody,
  ChartFormat,
  EditorAction,
} from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import * as React from 'react';

type Props = {
  body: ChartBody,
  dispatch: (EditorAction) => any,
  format: ChartFormat,
  id: BlockId,
};

/**
 * @description Input that changes maximum value (of y axis).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartMaxValueInput({ dispatch, format }: Props) {
  return (
    <>
      <Label>max</Label>
      <Input
        onChange={React.useCallback(
          ({ currentTarget }) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: { maxValue: +currentTarget.value },
            }),
          [dispatch]
        )}
        type={'number'}
        value={typeof format.maxValue === 'number' ? format.maxValue : ''}
      />
    </>
  );
}
