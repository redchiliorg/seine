// @flow
import * as React from 'react';
import { ChartSvg, ChartTitle } from '@seine/charts';

import type { ChartEditorProps as Props } from './types';
import ChartTitleInput from './ChartTitleInput';
import ChartEditorChild from './ChartEditorChild';

/**
 * @description Editor of bar chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartEditor({
  children,
  dispatch,
  dispatchElements,
}: Props) {
  return React.Children.map(children, (parent: ?React.Node) => {
    switch (parent.type) {
      case ChartTitle:
        return (
          <ChartTitle {...parent.props} key={parent.key}>
            <ChartTitleInput
              dispatch={dispatch}
              textAlignment={parent.props.textAlignment}
              value={parent.props.children}
            />
          </ChartTitle>
        );

      case ChartSvg:
        return (
          <ChartSvg {...parent.props} key={parent.key}>
            {React.Children.map(parent.props.children, (child: ?React.Node) => (
              <ChartEditorChild
                child={child}
                dispatchElements={dispatchElements}
              />
            ))}
          </ChartSvg>
        );

      default: {
        return parent;
      }
    }
  });
}
