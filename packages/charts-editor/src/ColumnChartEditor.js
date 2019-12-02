// @flow
import * as React from 'react';
import type { ColumnChartGroupProps } from '@seine/charts';
import {
  ChartLegendItem,
  ChartSvg,
  ChartTitle,
  ColumnChartGroup,
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
 * @description Editor of column chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartEditor({
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
          <ChartSvg {...parent.props}>
            {React.Children.map(parent.props.children, (child: ?React.Node) => {
              if (React.isValidElement(child)) {
                switch (child.type) {
                  case ChartLegendItem: {
                    return (
                      <ChartLegendItemInput
                        {...child.props}
                        key={[child.key, 'input']}
                        id={child.key}
                        dispatch={dispatchElements}
                      />
                    );
                  }

                  case ColumnChartGroup:
                    const {
                      elements,
                      fontSize,
                      group,
                      height,
                      maxValue,
                      minValue,
                      palette,
                      size,
                      x,
                      y,
                    }: ColumnChartGroupProps = child.props;

                    return [
                      <ChartInput
                        dominantBaseline={'hanging'}
                        key={[child.key, 'input']}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT_BY_GROUP,
                            body: { group: currentTarget.value },
                            group,
                          })
                        }
                        textAnchor={'middle'}
                        value={group}
                        x={x + (size * elements.length) / 2}
                        y={y}
                      />,

                      ...elements.map(({ value, index }, order) => {
                        const rectHeight =
                          (height * value) / (maxValue - minValue);
                        const dy = (height * minValue) / (maxValue - minValue);
                        const fill = palette[order % palette.length];
                        return (
                          <ChartInput
                            fill={fill}
                            key={[child.key, 'input', index]}
                            onChange={({ currentTarget }) =>
                              dispatchElements({
                                type: UPDATE_BLOCK_ELEMENT,
                                body: { value: +currentTarget.value },
                                index,
                              })
                            }
                            textAnchor={'middle'}
                            type={'number'}
                            value={+value}
                            x={x + size * order + size / 2}
                            y={dy + y - rectHeight}
                          />
                        );
                      }),

                      ...elements.map(({ value }, index) => {
                        const rectHeight =
                          (height * value) / (maxValue - minValue);
                        const dy = (height * minValue) / (maxValue - minValue);
                        const fill = palette[index % palette.length];
                        return (
                          <ClickAwayListener
                            key={[child.key, 'selection', index]}
                            onClickAway={(event) =>
                              !(
                                editor.selection === index ||
                                event.target instanceof HTMLButtonElement
                              ) &&
                              dispatchElements({
                                type: DESELECT_BLOCK_ELEMENT,
                                index,
                              })
                            }
                          >
                            <rect
                              fill={fill}
                              fontSize={fontSize}
                              height={rectHeight - dy}
                              width={size}
                              x={x + size * index}
                              y={dy + y - rectHeight}
                              {...(editor.selection === index
                                ? {
                                    strokeDasharray: 0.5,
                                    strokeWidth: 0.15,
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
                      }),
                    ];

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
