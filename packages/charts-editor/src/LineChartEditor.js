// @flow
import * as React from 'react';
import {
  ChartLegendItem,
  ChartTitle,
  LineChartGroup,
  LineChartValue,
} from '@seine/charts';
import type { LineChartGroupProps, LineChartValueProps } from '@seine/charts';
import { ForeignInput } from '@seine/ui';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT_BY_GROUP,
} from '@seine/core';

import type { ChartEditorProps as Props } from './types';
import ChartLegendItemInput from './ChartLegendItemInput';
import ChartTitleInput from './ChartTitleInput';

/**
 * @description Editor of line chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LineChartEditor({
  children,
  dispatch,
  dispatchElements,
  editor,
}: Props) {
  return React.Children.map(children, (parent: ?React.Node) => {
    switch (parent.type) {
      case ChartTitle:
        return (
          <ChartTitle {...parent.props} key={parent.key}>
            <ChartTitleInput
              dispatch={dispatch}
              value={parent.props.children}
            />
          </ChartTitle>
        );

      case 'svg':
        return (
          <svg {...parent.props} key={parent.key}>
            {React.Children.map(parent.props.children, (child: ?React.Node) => {
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
                        fontSize={0.9 * fontSize}
                        fontWeight={fontWeight}
                        height={height}
                        key={[child.key, 'input']}
                        lineHeight={lineHeight}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT_BY_GROUP,
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
                            type: UPDATE_BLOCK_ELEMENT,
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

                  case 'path': {
                    const [scope, key] = child.key.split(',');
                    const index = +key;

                    if (scope === 'line') {
                      return [
                        child,
                        <ClickAwayListener
                          key={[child.key, 'click-target']}
                          onClickAway={(event) =>
                            !(event.target instanceof HTMLButtonElement) &&
                            dispatchElements({
                              type: DESELECT_BLOCK_ELEMENT,
                              index,
                            })
                          }
                        >
                          <path
                            {...child.props}
                            {...(editor.selection === index
                              ? {
                                  strokeDasharray: 0.5,
                                  strokeWidth: 0.15,
                                  stroke: 'black',
                                }
                              : {
                                  strokeWidth: 4,
                                  stroke: 'transparent',
                                  markerEnd: 'none',
                                  markerMid: 'none',
                                  markerStart: 'none',
                                  onClick: (event) => {
                                    event.stopPropagation();
                                    dispatchElements({
                                      index,
                                      type: SELECT_BLOCK_ELEMENT,
                                    });
                                  },
                                })}
                          />
                        </ClickAwayListener>,
                      ];
                    }
                    return child;
                  }

                  default:
                    return child;
                }
              }
            })}
          </svg>
        );

      default:
        return parent;
    }
  });
}
