// @flow
import * as React from 'react';
import {
  ChartSvg,
  ChartTitle,
  PieChartSlice,
  PieChartTitle,
  PieChartValue,
} from '@seine/charts';
import type {
  ChartTitleProps,
  PieChartSliceProps,
  PieChartTitleProps,
  PieChartValueProps,
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
 * @description Editor of pie chart
 * @param {Props} props
 * @returns {React.Node}
 */
export default function PieChartEditor({
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
            <pattern
              id="selected-slice"
              viewBox={'0 0 3 2'}
              width={'1%'}
              height={'1%'}
            >
              <circle cx={1} cy={1} r={1} opacity={0.25} />
            </pattern>
            {React.Children.map(parent.props.children, (child: ?React.Node) => {
              if (React.isValidElement(child)) {
                switch (child.type) {
                  case ChartTitle: {
                    const { children, ...props }: ChartTitleProps = child.props;
                    return (
                      <ChartTitleInput
                        key={child.key}
                        dispatch={dispatch}
                        textAlignment={parent.props.textAlignment}
                        {...props}
                      >
                        {children}
                      </ChartTitleInput>
                    );
                  }

                  case PieChartTitle: {
                    let {
                      title,
                      fill,
                      index,
                      x,
                      y,
                    }: PieChartTitleProps = child.props;

                    return (
                      <ChartInput
                        dominantBaseline={'hanging'}
                        fill={fill}
                        key={child.key}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT,
                            body: { title: currentTarget.value },
                            index,
                          })
                        }
                        textAnchor={'middle'}
                        value={title}
                        variant={'h5'}
                        x={x}
                        y={y}
                      />
                    );
                  }

                  case PieChartValue: {
                    let {
                      fill,
                      index,
                      value,
                      x,
                      y,
                    }: PieChartValueProps = child.props;

                    return (
                      <ChartInput
                        fill={fill}
                        key={child.key}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT,
                            body: { value: +currentTarget.value },
                            index,
                          })
                        }
                        textAnchor={'middle'}
                        type={'number'}
                        value={value}
                        variant={'h4'}
                        x={x}
                        y={y}
                      />
                    );
                  }

                  case PieChartSlice: {
                    const { index }: PieChartSliceProps = child.props;
                    return index === editor.selection ? (
                      [
                        <ClickAwayListener
                          key={[child.key, 'selected']}
                          onClickAway={(event) =>
                            !(event.target instanceof HTMLButtonElement) &&
                            dispatchElements({
                              type: DESELECT_BLOCK_ELEMENT,
                              index,
                            })
                          }
                        >
                          <g>
                            {child}
                            <PieChartSlice
                              {...child.props}
                              palette={['url(#selected-slice)']}
                            />
                          </g>
                        </ClickAwayListener>,
                      ]
                    ) : (
                      <g
                        key={[child.key, 'click-target']}
                        onClick={(event) => {
                          event.stopPropagation();
                          dispatchElements({
                            index,
                            type: SELECT_BLOCK_ELEMENT,
                          });
                        }}
                      >
                        {child}
                      </g>
                    );
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
