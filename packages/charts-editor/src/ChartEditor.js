// @flow
import * as React from 'react';
import type { BlockEditor, ChartType, ElementsAction } from '@seine/core';
import { chartTypes, reduceElements, UPDATE_BLOCK_BODY } from '@seine/core';
import { BlockContainer, useSelectableBlockProps } from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import { Chart, defaultChartRenderMap } from '@seine/charts';

import PieChartEditor from './PieChartEditor';
import type { ChartEditorProps } from './types';
import BarChartEditor from './BarChartEditor';
import ColumnChartEditor from './ColumnChartEditor';

type Props = ChartProps &
  BlockEditor & {
    id: string,
    dispatch: Function,
    chartEditorRenderMap: {
      [kind: ChartType]: React.ComponentType<ChartEditorProps>,
    },
  };

const defaultChartEditorRenderMap = {
  ...defaultChartRenderMap,
  [chartTypes.PIE]: PieChartEditor,
  [chartTypes.BAR]: BarChartEditor,
  [chartTypes.COLUMN]: ColumnChartEditor,
};

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  dispatch,
  editor = null,

  kind = chartTypes.BAR,
  chartEditorRenderMap: {
    [kind]: ExactChartEditor,
  } = defaultChartEditorRenderMap,
  ...chartProps
}: Props) {
  const dispatchElements = React.useCallback(
    (action: ElementsAction) =>
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements: reduceElements(chartProps.elements, action) },
      }),
    [dispatch, chartProps.elements]
  );

  const isSelected =
    chartProps.selection.length === 1 &&
    chartProps.selection[0] === chartProps.id;

  return (
    <BlockContainer
      {...useSelectableBlockProps(
        {
          id: chartProps.id,
          selection: chartProps.selection,
        },
        dispatch
      )}
    >
      {isSelected ? (
        <ExactChartEditor
          dispatch={dispatch}
          dispatchElements={dispatchElements}
          editor={editor}
          {...chartProps}
        />
      ) : (
        <Chart kind={kind} {...chartProps} />
      )}
    </BlockContainer>
  );
}
