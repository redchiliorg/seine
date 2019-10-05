// @flow
import { Input } from '@seine/ui';
import type { BlockId, BlocksAction, ChartFormat } from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import * as React from 'react';
import styled from 'styled-components';
import { defaultChartFormat } from '@seine/charts';

type Props = {
  dispatch: (BlocksAction) => any,
  format: ChartFormat,
  label: string,
  id: BlockId,
  name: 'xAxis' | 'yAxis',
};

const Label = styled.label`
  align-items: center;
  display: flex;
`;

/**
 * @description Input that changes maximum value (of y axis).
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartSwitchFormatInput({
  dispatch,
  format,
  label,
  name,
}: Props) {
  return (
    <>
      <Label>{label}</Label>
      <Input
        type={'checkbox'}
        onChange={React.useCallback(
          ({ currentTarget }) =>
            dispatch({
              type: UPDATE_BLOCK_FORMAT,
              format: { [name]: +currentTarget.checked },
            }),
          [dispatch, name]
        )}
        checked={name in format ? format[name] : defaultChartFormat[name]}
      />
    </>
  );
}
