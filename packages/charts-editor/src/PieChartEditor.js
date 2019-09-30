// @flow
import * as React from 'react';
import { ForeignInput } from '@seine/ui';
import {
  PieChartTitle,
  PieChartTitleProps,
  PieChartValue,
  PieChartValueProps,
} from '@seine/charts';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';

import type { ChartEditorProps as Props } from './types';

/**
 * @description Editor of pie chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartEditorView({
  children,
  dispatch,
  selection,
  ...svgProps
}: Props) {
  return (
    <svg {...svgProps}>
      {React.Children.map(children, (child: ?React.Node) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case PieChartTitle: {
              let {
                fill,
                fontSize,
                index,
                lineHeight,
                width,
                title,
                x,
                y,
              }: PieChartTitleProps = child.props;
              fontSize = 0.85 * fontSize;

              return (
                <ForeignInput
                  transparent
                  align={'center'}
                  color={fill}
                  fontSize={fontSize}
                  height={2 * fontSize * lineHeight}
                  key={child.key}
                  lineHeight={lineHeight}
                  onChange={({ currentTarget }) =>
                    dispatch({
                      type: UPDATE_BLOCK_ELEMENT,
                      body: { title: currentTarget.value },
                      index,
                    })
                  }
                  value={title}
                  width={width}
                  x={x - width / 2}
                  y={y - fontSize * lineHeight}
                />
              );
            }

            case PieChartValue: {
              let {
                fill,
                fontSize,
                index,
                lineHeight,
                width,
                value,
                x,
                y,
              }: PieChartValueProps = child.props;
              fontSize = 0.85 * fontSize;

              return (
                <ForeignInput
                  transparent
                  align={'center'}
                  color={fill}
                  fontSize={fontSize}
                  height={2 * fontSize * lineHeight}
                  key={child.key}
                  lineHeight={lineHeight}
                  onChange={({ currentTarget }) =>
                    dispatch({
                      type: UPDATE_BLOCK_ELEMENT,
                      body: { value: +currentTarget.value },
                      index,
                    })
                  }
                  type={'number'}
                  value={value}
                  width={width}
                  x={x - width / 2}
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
