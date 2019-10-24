// @flow
import * as React from 'react';
import type { ColumnChartLegendProps } from '@seine/charts';
import { ForeignInput } from '@seine/ui';
import { UPDATE_BLOCK_ELEMENT_BY_ID } from '@seine/core';

/**
 * @description Input to edit a title of chart legend item
 * @returns {React.Node}
 */
export default function ChartLegendItemInput({
  dispatch,
  fontSize,
  id,
  lineHeight,
  size,
  title,
  width,
  x,
  y,
}: ColumnChartLegendProps & *) {
  return (
    <ForeignInput
      fontSize={fontSize}
      height={size}
      lineHeight={lineHeight}
      onChange={({ currentTarget }) =>
        dispatch({
          type: UPDATE_BLOCK_ELEMENT_BY_ID,
          body: { title: currentTarget.value },
          id,
        })
      }
      value={title}
      width={width + 2 * fontSize}
      x={x + size + fontSize * lineHeight}
      y={y}
    />
  );
}
