// @flow
import * as React from 'react';
import type { BarChartTitleProps, BarChartValueProps } from '@seine/charts';
import {
  BarChartElementTitle,
  BarChartElementValue,
  ChartTitle,
} from '@seine/charts';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
} from '@seine/core';
import { ForeignInput } from '@seine/ui';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
                        fontSize={0.9 * parent.props.fontSize}
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
                        width={width + parent.props.fontSize}
                        x={x}
                        y={y + (parent.props.fontSize * lineHeight) / 3}
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
                        fontSize={0.9 * parent.props.fontSize}
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
                        width={width + 2 * parent.props.fontSize}
                        x={x}
                        y={y + (parent.props.fontSize * lineHeight) / 3}
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
            })}
          </svg>
        );

      default:
        return parent;
    }
  });
}
