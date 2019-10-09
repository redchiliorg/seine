// @flow
import * as React from 'react';
import { ForeignInput } from '@seine/ui';
import { UPDATE_BLOCK_BODY } from '@seine/core';
import type { ChartTitleProps } from '@seine/charts';
import type { BlocksAction } from '@seine/core';

type Props = ChartTitleProps & {
  dispatch: (BlocksAction) => any,
};

/**
 * @description Input to edit a title of chart legend item
 * @returns {React.Node}
 */
export default function ChartTitleInput({
  fontSize,
  fontWeight,
  children,
  dispatch,
  lineHeight,
  x,
  y,
}: Props) {
  return (
    <ForeignInput
      fontSize={0.85 * fontSize}
      fontWeight={fontWeight}
      height={lineHeight * fontSize}
      onChange={({ currentTarget }) =>
        dispatch({
          type: UPDATE_BLOCK_BODY,
          body: { title: currentTarget.value },
        })
      }
      value={children}
      x={x}
      y={y - fontSize / 2}
    />
  );
}
