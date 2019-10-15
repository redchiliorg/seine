// @flow
import * as React from 'react';
import type { BlockEditor, ChartType, ElementsAction } from '@seine/core';
import {
  chartTypes,
  initialElementsState,
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { BlockActions, useSelectableBlockProps } from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import { Chart, ChartContainer, defaultChartRenderMap } from '@seine/charts';

import PieChartEditor from './PieChartEditor';
import BarChartEditor from './BarChartEditor';
import ColumnChartEditor from './ColumnChartEditor';
import LineChartEditor from './LineChartEditor';
import type { ChartEditorProps } from './types';

type Props = (ChartProps & BlockEditor) & {
  chartEditorRenderMap?: {
    [kind: ChartType]: React.ComponentType<ChartEditorProps>,
  },
};

const defaultChartEditorRenderMap = {
  [chartTypes.PIE]: (props) => <Chart {...props} as={PieChartEditor} />,
  [chartTypes.BAR]: (props) => <Chart {...props} as={BarChartEditor} />,
  [chartTypes.COLUMN]: (props) => <Chart {...props} as={ColumnChartEditor} />,
  [chartTypes.LINE]: (props) => <Chart {...props} as={LineChartEditor} />,
};

const defaultEditor = { selection: initialElementsState.selection };

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  kind = chartTypes.BAR,
  addButtonRenderMap,
  chartRenderMap: { [kind]: ExactChart } = defaultChartRenderMap,
  chartEditorRenderMap: {
    [kind]: ExactChartEditor,
  } = defaultChartEditorRenderMap,
  dispatch,
  editor = defaultEditor,
  selection,
  ...chartProps
}: Props) {
  const dispatchElements = React.useCallback(
    (action: ElementsAction) => {
      const { elements, selection } = reduceElements(
        {
          elements: chartProps.elements,
          selection: editor.selection,
        },
        action
      );

      if (elements !== chartProps.elements) {
        dispatch({
          type: UPDATE_BLOCK_BODY,
          body: { elements },
        });
      }

      if (selection !== editor.selection) {
        dispatch({
          type: UPDATE_BLOCK_EDITOR,
          editor: { selection },
        });
      }
    },
    [chartProps.elements, editor, dispatch]
  );

  return (
    <ChartContainer>
      {selection.length === 1 && selection[0] === chartProps.id ? (
        <ExactChartEditor
          kind={kind}
          dispatch={dispatch}
          dispatchElements={dispatchElements}
          editor={editor}
          selection={selection}
          {...chartProps}
        />
      ) : (
        <ExactChart {...chartProps} />
      )}

      <BlockActions
        addButtonRenderMap={addButtonRenderMap}
        dispatch={dispatch}
        id={chartProps.id}
        {...useSelectableBlockProps({ id: chartProps.id, selection }, dispatch)}
      />
    </ChartContainer>
  );
}
