// @flow
import * as React from 'react';
import { SvgInput, SvgTypography, useTypographyChildren } from '@seine/styles';
import type { ElementsAction } from '@seine/core';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { ChartTitle } from '@seine/charts';
import styled from 'styled-components/macro';

import ChartTitleInput from './ChartTitleInput';

type Props = {
  child: React.ElementType,
  dispatchElements: (ElementsAction) => any,
};

const HiddenSvgGroup = styled.g`
  opacity: 0;
`;

const defaultChartEditorChildRenderMap = new WeakMap([
  [
    ChartTitle,
    ({ child, dispatch }) => (
      <ChartTitle {...child.props} key={child.key}>
        <ChartTitleInput
          dispatch={dispatch}
          textAlignment={child.props.textAlignment}
          value={child.props.children}
        />
      </ChartTitle>
    ),
  ],
  [
    SvgTypography,
    ({ child, dispatchElements }) => {
      const {
        key,
        props: { index, children },
      } = child;
      const text = useTypographyChildren(children);

      return [
        <HiddenSvgGroup key={[key, 'group']}>{child}</HiddenSvgGroup>,
        <SvgInput
          {...child.props}
          key={[key, 'input']}
          type={key === 'value' ? 'number' : 'text'}
          onChange={({ currentTarget }) =>
            dispatchElements({
              type: UPDATE_BLOCK_ELEMENT,
              body: {
                [key]:
                  key === 'value' ? +currentTarget.value : currentTarget.value,
              },
              index: index,
            })
          }
        >
          {key === 'value' ? parseFloat(text) : text}
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
