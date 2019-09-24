// @flow
import * as React from 'react';
import {
  ChartLegendItem,
  LineChart,
  LineChartGroup,
  LineChartGroupProps,
  LineChartValue,
  LineChartValueProps,
} from '@seine/charts';
import { ForeignInput } from '@seine/ui';
import { UPDATE_ELEMENT, UPDATE_ELEMENT_BY_GROUP } from '@seine/core';

import type { ChartEditorProps as Props } from './types';
import ChartLegendItemInput from './ChartLegendItemInput';

/**
 * @description Editor of column chart
 * props {Props}
 * @returns {React.Node}
 */
export default function LineChartEditor({
  dispatch,
  editor,
  ...chartProps
}: Props) {
  return <LineChart {...chartProps} as={LineChartEditorView} />;
}

// eslint-disable-next-line
function LineChartEditorView({ children, dispatchElements, ...viewProps }) {
  return (
    <svg {...viewProps}>
      {React.Children.map(children, (child: ?React.Node) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case ChartLegendItem:
              return [
                child,
                <ChartLegendItemInput
                  {...child.props}
                  key={[child.key, 'input']}
                  id={child.key}
                  dispatchElements={dispatchElements}
                />,
              ];

            case LineChartGroup: {
              const {
                fontSize,
                fontWeight,
                group,
                height,
                lineHeight,
                width,
                x,
                y,
              }: LineChartGroupProps = child.props;
              return [
                child,
                <ForeignInput
                  align={'center'}
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                  height={height}
                  key={[child.key, 'input']}
                  lineHeight={lineHeight}
                  onChange={({ currentTarget }) =>
                    dispatchElements({
                      type: UPDATE_ELEMENT_BY_GROUP,
                      body: { group: currentTarget.value },
                      group,
                    })
                  }
                  value={group}
                  width={width}
                  x={x - width / 2}
                  y={y - fontSize * lineHeight}
                />,
              ];
            }

            case LineChartValue: {
              const {
                fontSize,
                fontWeight,
                height,
                index,
                lineHeight,
                value,
                width,
                x,
                y,
              }: LineChartValueProps = child.props;
              return (
                <ForeignInput
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                  height={height}
                  key={[child.key, 'input']}
                  lineHeight={lineHeight}
                  onChange={({ currentTarget }) =>
                    dispatchElements({
                      type: UPDATE_ELEMENT,
                      body: { value: +currentTarget.value },
                      index,
                    })
                  }
                  transparent
                  value={value}
                  type={'number'}
                  width={width}
                  x={x}
                  y={y - fontSize * lineHeight}
                />
              );
            }

            default:
              return child;
          }
        }
      })}
    </svg>
  );
}
