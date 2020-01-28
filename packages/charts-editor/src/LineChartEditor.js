// @flow
import * as React from 'react';
import { ChartLegendItem, ChartSvg, ChartTitle } from '@seine/charts';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT_BY_GROUP,
} from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';
import { SvgInput, SvgTypography } from '@seine/styles';

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
              textAlignment={parent.props.textAlignment}
              value={parent.props.children}
            />
          </ChartTitle>
        );

      case ChartSvg:
        return (
          <ChartSvg {...parent.props} key={parent.key}>
            {React.Children.map(parent.props.children, (child: ?React.Node) => {
              if (
                React.isValidElement(child) &&
                child.type === ChartLegendItem
              ) {
                return (
                  <ChartLegendItemInput
                    {...child.props}
                    key={[child.key, 'input']}
                    id={child.key}
                    dispatch={dispatchElements}
                  />
                );
              }

              if (React.isValidElement(child) && child.type === 'path') {
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

              if (React.isValidElement(child) && child.type === SvgTypography) {
                if (child.key.startsWith('group,')) {
                  return (
                    <SvgInput
                      {...child.props}
                      ref={child.ref}
                      key={child.key}
                      onChange={({ currentTarget }) =>
                        dispatchElements({
                          type: UPDATE_BLOCK_ELEMENT_BY_GROUP,
                          body: { group: currentTarget.value },
                          group: child.props.children,
                        })
                      }
                    />
                  );
                }

                if (child.key.startsWith('value,')) {
                  return (
                    <SvgInput
                      {...child.props}
                      key={child.key}
                      onChange={({ currentTarget }) =>
                        dispatchElements({
                          type: UPDATE_BLOCK_ELEMENT,
                          body: { value: +currentTarget.value },
                          index: child.props.index,
                        })
                      }
                      type={'number'}
                    />
                  );
                }
              }
              return child;
            })}
          </ChartSvg>
        );

      default:
        return parent;
    }
  });
}
