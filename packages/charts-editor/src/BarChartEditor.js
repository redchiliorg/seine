// @flow
import * as React from 'react';
import type { BarChartTitleProps, BarChartValueProps } from '@seine/charts';
import {
  BarChartElementTitle,
  BarChartElementValue,
  ChartSvg,
  ChartTitle,
} from '@seine/charts';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
} from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';

import type { ChartEditorProps as Props } from './types';
import ChartTitleInput from './ChartTitleInput';
import ChartInput from './ChartInput';

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
                  case BarChartElementValue: {
                    const {
                      children: value,
                      fill,
                      index,
                      x,
                      y,
                    }: BarChartValueProps = child.props;

                    return (
                      <ChartInput
                        dominantBaseline={'middle'}
                        fill={fill}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT,
                            body: { value: +currentTarget.value },
                            index,
                          })
                        }
                        key={child.key}
                        type={'number'}
                        value={value}
                        variant={'body2'}
                        x={x}
                        y={y}
                      />
                    );
                  }

                  case BarChartElementTitle: {
                    const {
                      children: value,
                      fill,
                      index,
                      x,
                      y,
                    }: BarChartTitleProps = child.props;

                    return (
                      <ChartInput
                        dominantBaseline={'middle'}
                        fill={fill}
                        key={child.key}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT,
                            body: { title: currentTarget.value },
                            index,
                          })
                        }
                        textAnchor={'end'}
                        value={value}
                        variant={'body2'}
                        x={x}
                        y={y}
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
          </ChartSvg>
        );

      default:
        return parent;
    }
  });
}
