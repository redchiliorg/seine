// @flow
import * as React from 'react';
import {
  BarChart,
  BarChartTitle,
  BarChartTitleProps,
  BarChartValue,
  BarChartValueProps,
} from '@seine/charts';
import { UPDATE_ELEMENT } from '@seine/core';
import { ForeignInput } from '@seine/ui';

import type { ChartEditorProps as Props } from './types';

/**
 * @description Editor of column chart
 * props {Props}
 * @returns {React.Node}
 */
export default function BarChartEditor({
  dispatch,
  editor,
  ...chartProps
}: Props) {
  return <BarChart {...chartProps} as={BarChartEditorView} />;
}

// eslint-disable-next-line
function BarChartEditorView({
  children,
  dispatchElements,
  fontSize,
  ...viewProps
}) {
  return (
    <svg {...viewProps} fontSize={fontSize}>
      {React.useMemo(
        () =>
          React.Children.map(children, (child: ?React.Node) => {
            if (React.isValidElement(child)) {
              switch (child.type) {
                case BarChartValue: {
                  const {
                    children: value,
                    fill,
                    height,
                    index,
                    lineHeight,
                    width,
                    x,
                    y,
                  }: BarChartValueProps | BarChartTitleProps = child.props;

                  return (
                    <ForeignInput
                      color={fill}
                      fontSize={0.9 * fontSize}
                      height={height / 3}
                      key={child.key}
                      onChange={({ currentTarget }) =>
                        dispatchElements({
                          type: UPDATE_ELEMENT,
                          body: { value: currentTarget.value },
                          index,
                        })
                      }
                      type={'number'}
                      value={value}
                      width={width + fontSize}
                      x={x}
                      y={y + (fontSize * lineHeight) / 3}
                    />
                  );
                }

                case BarChartTitle: {
                  const {
                    children: title,
                    fill,
                    height,
                    index,
                    lineHeight,
                    width,
                    x,
                    y,
                  }: BarChartValueProps | BarChartTitleProps = child.props;

                  return (
                    <ForeignInput
                      color={fill}
                      fontSize={0.9 * fontSize}
                      height={height / 3}
                      key={child.key}
                      onChange={({ currentTarget }) =>
                        dispatchElements({
                          type: UPDATE_ELEMENT,
                          body: { title: currentTarget.value },
                          index,
                        })
                      }
                      value={title}
                      width={width + 2 * fontSize}
                      x={x}
                      y={y + (fontSize * lineHeight) / 3}
                    />
                  );
                }

                default:
                  return child;
              }
            }
          }),
        [children, dispatchElements, fontSize]
      )}
    </svg>
  );
}
