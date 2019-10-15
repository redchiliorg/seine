// @flow
import * as React from 'react';
import type { ImageBody, ImageFormat, ToolbarProps } from '@seine/core';
import { Toolbar } from '@seine/ui';

type Props = ToolbarProps & {
  body: ImageBody,
  format: ImageFormat,
};

/**
 * @description Action buttons to edit currently selected bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartToolbar({ children }: Props) {
  return <Toolbar>{children}</Toolbar>;
}
