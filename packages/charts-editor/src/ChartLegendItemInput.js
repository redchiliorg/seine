// @flow
import * as React from 'react';
import type { ColumnChartLegendProps } from '@seine/charts';
import { UPDATE_BLOCK_ELEMENT_BY_ID } from '@seine/core';

import ChartInput from './ChartInput';

/**
 * @description Input to edit a title of chart legend item
 * @returns {React.Node}
 */
export default function ChartLegendItemInput({
  dispatch,
  fill,
  id,
  size,
  title,
  width,
  x,
  y,
}: ColumnChartLegendProps & *) {
  return (
    <g width={width}>
      <rect fill={fill} height={size} width={size} x={x} y={y} />
      <ChartInput
        dominantBaseline={'middle'}
        onChange={({ currentTarget }) =>
          dispatch({
            type: UPDATE_BLOCK_ELEMENT_BY_ID,
            body: { title: currentTarget.value },
            id,
          })
        }
        value={title}
        x={x + size}
        y={y + size / 2}
      />
    </g>
  );
}
