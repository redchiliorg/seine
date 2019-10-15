// @flow
import * as React from 'react';
import { ForeignInput } from '@seine/ui';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import type { ColumnChartGroupProps } from '@seine/charts';
import {
  ChartLegendItem,
  ChartTitle,
  ChartTitleProps,
  ColumnChartGroup,
} from '@seine/charts';
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
              value={parent.props.children}
            />
          </ChartTitle>
        );

      case 'svg':
        return (
          <svg {...parent.props}>
            {React.Children.map(parent.props.children, (child: ?React.Node) => {
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

                  case ColumnChartGroup:
                    const {
                      elements,
                      fontSize,
                      group,
                      height,
                      lineHeight,
                      maxValue,
                      minValue,
                      palette,
                      size,
                      x,
                      y,
                    }: ColumnChartGroupProps = child.props;
                    const groupFontSize = fontSize * 1.3;

                    return [
                      child,
                      <ForeignInput
                        align={'center'}
                        fontSize={groupFontSize}
                        height={size}
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
                        width={size * elements.length}
                        x={x}
                        y={y + (fontSize * lineHeight) / 4}
                      />,

                      ...elements.map(({ index, value }, order) => (
                        <ForeignInput
                          color={palette[order % palette.length]}
                          fontSize={0.9 * fontSize}
                          height={size}
                          key={[child.key, 'input', order]}
                          lineHeight={lineHeight}
                          onChange={({ currentTarget }) =>
                            dispatchElements({
                              type: UPDATE_BLOCK_ELEMENT,
                              body: { value: +currentTarget.value },
                              index,
                            })
                          }
                          type={'number'}
                          value={+value}
                          width={size}
                          x={x + size * order}
                          y={y + (fontSize * lineHeight) / 4 + size}
                        />
                      )),

                      ...elements.map(({ value }, index) => {
                        const rectHeight =
                          (height * value) / (maxValue - minValue);
                        const dy = (height * minValue) / (maxValue - minValue);
                        const fill = palette[index % palette.length];
                        return (
                          <ClickAwayListener
                            key={['bar', 'selection', index]}
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
          </svg>
        );

      default:
        return parent;
    }
  });
}
