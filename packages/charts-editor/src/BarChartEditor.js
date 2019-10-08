// @flow
import * as React from 'react';
import {
  BarChartElementTitle,
  BarChartElementValue,
  ChartTitle,
  ChartTitleProps,
} from '@seine/charts';
import type { BarChartTitleProps, BarChartValueProps } from '@seine/charts';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
} from '@seine/core';
import { ClickAwayListener, ForeignInput } from '@seine/ui';

import type { ChartEditorProps as Props } from './types';
import ChartTitleInput from './ChartTitleInput';

/**
 * @description Editor of bar chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartEditor({
  children,
  dispatch,
  dispatchElements,
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
                case ChartTitle: {
                  const { children, ...props }: ChartTitleProps = child.props;
                  return (
                    <ChartTitleInput
                      key={child.key}
                      dispatch={dispatch}
                      {...props}
                    >
                      {children}
                    </ChartTitleInput>
                  );
                }

                case BarChartElementValue: {
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
                        dispatchElements({
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

                case BarChartElementTitle: {
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
                        dispatchElements({
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
                    <ClickAwayListener
                      key={child.key}
                      onClickAway={(event) =>
                        !(event.target instanceof HTMLButtonElement) &&
                        dispatchElements({
                          type: DESELECT_BLOCK_ELEMENT,
                          index,
                        })
                      }
                    >
                      <rect
                        {...child.props}
                        {...(editor.selection === index
                          ? {
                              strokeDasharray: 0.25,
                              strokeWidth: 0.05,
                              stroke: 'black',
                            }
                          : {
                              onClick: (event) => {
                                event.stopPropagation();
                                dispatchElements({
                                  index,
                                  type: SELECT_BLOCK_ELEMENT,
                                });
                              },
                            })}
                      />
                    </ClickAwayListener>
                  );

                default:
                  return child;
              }
            }
          }),
        [children, dispatch, dispatchElements, editor.selection, fontSize]
      )}
    </svg>
  );
}
