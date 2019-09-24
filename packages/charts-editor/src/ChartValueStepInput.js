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
 * @description Input that changes value step (of y axis).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartValueStepInput({ dispatch, format }: Props) {
  return (
    <>
      <Label>step</Label>
      <Input
        type={'number'}
        onChange={React.useCallback(
          ({ currentTarget }) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: { dy: +currentTarget.value },
            }),
          [dispatch]
        )}
        value={typeof format.dy === 'number' ? format.dy : ''}
      />
    </>
  );
}
