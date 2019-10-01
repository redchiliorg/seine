// @flow
import * as React from 'react';
import { BarChartTitle, BarChartValue } from '@seine/charts';
import type { BarChartTitleProps, BarChartValueProps } from '@seine/charts';
import { SELECT_BLOCK_ELEMENT, UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { ForeignInput } from '@seine/ui';

import type { ChartEditorProps as Props } from './types';

/**
 * @description Editor of bar chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartEditor({
  children,
  dispatch,
  editor,
  fontSize,
  selection,
  ...svgProps
}: Props) {
  return (
    <svg {...svgProps} fontSize={fontSize}>
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
                  }: BarChartValueProps = child.props;

                  return (
                    <ForeignInput
                      color={fill}
                      fontSize={0.9 * fontSize}
                      height={height / 3}
                      key={child.key}
                      onChange={({ currentTarget }) =>
                        dispatch({
                          type: UPDATE_BLOCK_ELEMENT,
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
                  }: BarChartTitleProps = child.props;

                  return (
                    <ForeignInput
                      color={fill}
                      fontSize={0.9 * fontSize}
                      height={height / 3}
                      key={child.key}
                      onChange={({ currentTarget }) =>
                        dispatch({
                          type: UPDATE_BLOCK_ELEMENT,
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

                case 'rect':
                  const index = +child.key.split(',')[1];
                  return (
                    <rect
                      {...child.props}
                      key={child.key}
                      {...(editor.selection === index
                        ? {
                            strokeDasharray: 0.25,
                            strokeWidth: 0.05,
                            stroke: 'black',
                          }
                        : {
                            onClick: () =>
                              dispatch({
                                index,
                                type: SELECT_BLOCK_ELEMENT,
                              }),
                          })}
                    />
                  );

                default:
                  return child;
              }
            }
          }),
        [children, dispatch, editor.selection, fontSize]
      )}
    </svg>
  );
}
