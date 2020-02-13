// @flow
import * as React from 'react';
import { SvgInput, SvgTypography, useTypographyChildren } from '@seine/styles';
import type { ElementsAction } from '@seine/core';
import {
  DESELECT_BLOCK_ELEMENT,
  SELECT_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT,
  UPDATE_BLOCK_ELEMENT_BY_GROUP,
} from '@seine/core';
import styled from 'styled-components/macro';
import { ClickAwayListener } from '@material-ui/core';

import type { ChartEditorProps } from './types';

const HiddenSvgGroup = styled.g`
  opacity: 0;
`;

type Props = ChartEditorProps & {
  dispatchElements: (ElementsAction) => any,
};

type ChildProps = Props & {
  child: React.Node,
};

const defaultChartEditorChildRenderMap = new Map([
  [
    'rect',
    ({ child, editor, dispatchElements }: ChildProps) => {
      const [source, index] = child.key.split('.');
      if (source === 'selection' && index) {
        return (
          <ClickAwayListener
            onClickAway={(event) =>
              !(event.target instanceof HTMLButtonElement) &&
              dispatchElements({
                type: DESELECT_BLOCK_ELEMENT,
                index: +index,
              })
            }
          >
            <rect
              {...child.props}
              {...(editor.selection === +index
                ? {
                    strokeDasharray: 0.25,
                    strokeWidth: 0.05,
                    stroke: 'black',
                  }
                : {
                    onClick: (event) => {
                      event.stopPropagation();
                      event.preventDefault();
                      dispatchElements({
                        index: +index,
                        type: SELECT_BLOCK_ELEMENT,
                      });
                    },
                  })}
            />
          </ClickAwayListener>
        );
      }
      return child;
    },
  ],
  [
    SvgTypography,
    ({ child, dispatchElements }: ChildProps) => {
      const {
        key,
        props: { children },
      } = child;
      const [source, index] = key.split('.');

      if (!index && source !== 'group') {
        return child;
      }

      const text = useTypographyChildren(children);

      return [
        <HiddenSvgGroup key={[key, 'group']}>{child}</HiddenSvgGroup>,
        <SvgInput
          {...child.props}
          key={[key, 'input']}
          type={source === 'value' ? 'number' : 'text'}
          onChange={({ currentTarget }) =>
            dispatchElements(
              source === 'group'
                ? {
                    type: UPDATE_BLOCK_ELEMENT_BY_GROUP,
                    group: source,
                  }
                : {
                    type: UPDATE_BLOCK_ELEMENT,
                    body: {
                      [source]:
                        source === 'value'
                          ? +currentTarget.value
                          : currentTarget.value,
                    },
                    index: +index,
                  }
            )
          }
        >
          {source === 'value' ? parseFloat(text) : text}
        </SvgInput>,
      ];
    },
  ],
]);

/**
 * @description Inject editor inputs for chart component children.
 * @param {Props} props
 * @returns {React.Node}
 */
function ChartEditorChild({
  chartEditorChildRenderMap = defaultChartEditorChildRenderMap,
  child,
  dispatch,
  dispatchElements,
  editor,
}: Props) {
  if (React.isValidElement(child)) {
    const {
      type: Child,
      props: { children = null, ...childProps },
      key,
    } = child;

    const ChildInput = chartEditorChildRenderMap.get(Child);
    if (ChildInput) {
      return (
        <ChildInput
          child={child}
          dispatch={dispatch}
          dispatchElements={dispatchElements}
          editor={editor}
        />
      );
    }
    return (
      <Child
        {...childProps}
        {...(children && {
          children: React.Children.map(children, (child) => (
            <ChartEditorChild
              child={child}
              dispatch={dispatch}
              dispatchElements={dispatchElements}
              editor={editor}
              key={[key, 'editor']}
            />
          )),
        })}
      />
    );
  }

  return child;
}

/**
 * @description Editor of a chart with child inputs injection
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditorChildren({
  children,
  ...chartEditorProps
}: Props) {
  return React.Children.map(children, (child: ?React.Node) => (
    <ChartEditorChild
      child={child}
      key={[child.key, 'child']}
      {...chartEditorProps}
    />
  ));
}
