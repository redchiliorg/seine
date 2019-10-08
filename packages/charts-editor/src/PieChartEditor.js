// @flow
import * as React from 'react';
import { ClickAwayListener, ForeignInput } from '@seine/ui';
import {
  ChartTitle,
  ChartTitleProps,
  PieChartSlice,
  PieChartTitle,
  PieChartValue,
} from '@seine/charts';
import type {
  PieChartSliceProps,
  PieChartTitleProps,
  PieChartValueProps,
} from '@seine/charts';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
} from '@seine/core';

import type { ChartEditorProps as Props } from './types';
import ChartTitleInput from './ChartTitleInput';

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
  selection,
  ...svgProps
}: Props) {
  return (
    <svg {...svgProps}>
      <pattern
        id="selected-slice"
        viewBox={'0 0 3 2'}
        width={'1%'}
        height={'1%'}
      >
        <circle cx={1} cy={1} r={1} opacity={0.25} />
      </pattern>

      {React.Children.map(children, (child: ?React.Node) => {
        if (React.isValidElement(child)) {
          switch (child.type) {
            case ChartTitle: {
              const { children, ...props }: ChartTitleProps = child.props;
              return (
                <ChartTitleInput key={child.key} dispatch={dispatch} {...props}>
                  {children}
                </ChartTitleInput>
              );
            }

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
                    dispatchElements({
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
    </svg>
  );
}
