// @flow
import * as React from 'react';
import type { LineChartGroupProps, LineChartValueProps } from '@seine/charts';
import {
  ChartLegendItem,
  ChartSvg,
  ChartTitle,
  LineChartGroup,
  LineChartValue,
} from '@seine/charts';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT_BY_GROUP,
} from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';

import type { ChartEditorProps as Props } from './types';
import ChartLegendItemInput from './ChartLegendItemInput';
import ChartTitleInput from './ChartTitleInput';
import ChartInput from './ChartInput';

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
              textAlignment={parent.props.textAlignment}
              value={parent.props.children}
            />
          </ChartTitle>
        );

      case ChartSvg:
        return (
          <ChartSvg {...parent.props} key={parent.key}>
            {React.Children.map(parent.props.children, (child: ?React.Node) => {
              if (React.isValidElement(child)) {
                switch (child.type) {
                  case ChartLegendItem:
                    return (
                      <ChartLegendItemInput
                        {...child.props}
                        key={[child.key, 'input']}
                        id={child.key}
                        dispatch={dispatchElements}
                      />
                    );

                  case LineChartGroup: {
                    const { group, x, y }: LineChartGroupProps = child.props;
                    return (
                      <ChartInput
                        dominantBaseline={'hanging'}
                        fontWeight={'bold'}
                        key={child.key}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT_BY_GROUP,
                            body: { group: currentTarget.value },
                            group,
                          })
                        }
                        textAnchor={'middle'}
                        value={group}
                        variant={'h5'}
                        x={x}
                        y={y}
                      />
                    );
                  }

                  case LineChartValue: {
                    const {
                      index,
                      maxValue,
                      minValue,
                      value,
                      x,
                      y,
                    }: LineChartValueProps = child.props;
                    return (
                      <ChartInput
                        key={child.key}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT,
                            body: {
                              value: Math.max(
                                minValue,
                                Math.min(maxValue, +currentTarget.value)
                              ),
                            },
                            index,
                          })
                        }
                        value={value}
                        type={'number'}
                        max={maxValue}
                        min={minValue}
                        x={x}
                        y={y}
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
          </ChartSvg>
        );

      default:
        return parent;
    }
  });
}
