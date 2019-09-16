// @flow
import * as React from 'react';
import type { EditorAction } from '@seine/core';
import { ColumnChart } from '@seine/charts';

type Props = {
  children: React.ChildrenArray<any>,
  dispatch: (EditorAction) => any,
};

/**
 * @description View of a column chart with editor interface
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartEditorView({
  dispatch,
  children,
  childRenderMap,
  ...svgProps
}: Props) {
  return (
    <svg {...svgProps}>
      {React.Children.map(children, (child: ?React.Node, index) =>
        child && child.type === ColumnChart.Legend ? (
          <child.type key={index} {...child.props} />
        ) : (
          child
        )
      )}
    </svg>
  );
}
