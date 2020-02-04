// @flow
import * as React from 'react';
import { SvgInput, SvgTypography } from '@seine/styles';
import type { ElementsAction } from '@seine/core';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { ChartTitle } from '@seine/charts';

import ChartTitleInput from './ChartTitleInput';

type Props = {
  child: React.ElementType,
  dispatchElements: (ElementsAction) => any,
};

const defaultChartEditorChildRenderMap = {
  [ChartTitle]: ({ child, dispatch }) => (
    <ChartTitle {...child.props} key={child.key}>
      <ChartTitleInput
        dispatch={dispatch}
        textAlignment={child.props.textAlignment}
        value={child.props.children}
      />
    </ChartTitle>
  ),
  [SvgTypography]: ({
    child: {
      key,
      props: { index, children, ...childProps },
    },
    dispatchElements,
  }) => (
    <SvgInput
      {...childProps}
      type={key === 'value' ? 'number' : 'text'}
      onChange={({ currentTarget }) =>
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT,
          body: {
            [key]: key === 'value' ? +currentTarget.value : currentTarget.value,
          },
          index: index,
        })
      }
    >
      {key === 'value' ? parseInt(children) : children}
    </SvgInput>
  ),
};

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

    if (Child in chartEditorChildRenderMap) {
      const ChildInput = chartEditorChildRenderMap[Child];
      return [
        child,
        <ChildInput
          key={[key, 'input']}
          child={child}
          dispatch={dispatch}
          dispatchElements={dispatchElements}
        />,
      ];
    }
    return (
      <Child
        {...childProps}
        key={[key, 'child']}
        {...(children && {
          children: React.Children.map(children, (child) => (
            <ChartEditorChild
              child={child}
              dispatch={dispatch}
              dispatchElements={dispatchElements}
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
    <ChartEditorChild child={child} {...chartEditorProps} />
  ));
}
