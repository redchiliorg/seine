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
import {
  BlockActions,
  BlockContainer,
  useSelectableBlockProps,
} from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import { Chart } from '@seine/charts';

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

const ChartEditorContent = ({
  kind = chartTypes.BAR,
  addButtonRenderMap,
  chartEditorRenderMap: {
    [kind]: ExactChartEditor,
  } = defaultChartEditorRenderMap,
  dispatch,
  dispatchElements,
  editor,
  selection,
  ...chartProps
}: Props) =>
  selection.length === 1 && selection[0] === chartProps.id ? (
    <ExactChartEditor
      {...chartProps}
      dispatch={dispatch}
      dispatchElements={dispatchElements}
      editor={editor}
      kind={kind}
      selection={selection}
    />
  ) : (
    <>
      <BlockActions
        addButtonRenderMap={addButtonRenderMap}
        dispatch={dispatch}
        id={chartProps.id}
      />
      <Chart kind={kind} {...chartProps} />
    </>
  );

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  addButtonRenderMap,
  dispatch,
  editor = defaultEditor,
  selection,
  ...chartProps
}: Props) {
  return (
    <BlockContainer
      {...useSelectableBlockProps({ id: chartProps.id, selection }, dispatch)}
    >
      <ChartEditorContent
        {...chartProps}
        addButtonRenderMap={addButtonRenderMap}
        id={chartProps.id}
        dispatch={dispatch}
        dispatchElements={React.useCallback(
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
        )}
        editor={editor}
        selection={selection}
      />
    </BlockContainer>
  );
}
