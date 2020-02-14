// @flow
import * as React from 'react';
import type { ChartTitleProps } from '@seine/charts';
import { ChartSvg, ChartTitle } from '@seine/charts';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
} from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';
import { SvgInput, SvgTypography } from '@seine/styles';

import type { ChartEditorProps as Props } from './types';
import ChartTitleInput from './ChartInlineInput';

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

                  case SvgTypography: {
                    return (
                      <SvgInput
                        key={child.key}
                        {...child.props}
                        onChange={({ currentTarget }) =>
                          dispatchElements({
                            type: UPDATE_BLOCK_ELEMENT,
                            body:
                              child.key === 'value'
                                ? { value: +currentTarget.value }
                                : { title: currentTarget.value },
                            index: child.props.index,
                          })
                        }
                        type={child.key === 'value' ? 'number' : 'text'}
                        value={child.props.children}
                      />
                    );
                  }

                  case 'path': {
                    const index = +child.key.split(',')[1];
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
                            <path
                              {...child.props}
                              fill={['url(#selected-slice)']}
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
