// @flow
import * as React from 'react';

import type { ChartEditorProps } from './types';
import ChartEditorChildren from './ChartEditorChildren';

type Props = ChartEditorProps & {
  children: React.ChildrenArray<any>,
};

/**
 * @description Editor of bar chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartEditor({
  children,
  ...chartEditorProps
}: Props) {
  return React.Children.map(children, (child: ?React.Node) => (
    <ChartEditorChildren child={child} {...chartEditorProps} />
  ));
}
