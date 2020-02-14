// @flow
import * as React from 'react';
import {
  chartTypes,
  initialElementsState,
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import { BlockActions } from '@seine/ui';
import {
  BarChartContent,
  BarChartDescription,
  Chart,
  ChartLayout,
  ChartSvg,
  ColumnChartContent,
  defaultChartTextAlignment,
  defaultChartTitle,
  LineChartContent,
  LineChartDescription,
  PieChartContent,
  PieChartDescription,
} from '@seine/charts';
import { useResizeTargetRef } from '@seine/styles';
import { useAutoCallback } from 'hooks.macro';
import type { ElementsAction } from '@seine/core';

import type { ChartEditorProps as Props } from './types';
import ChartInlineInput from './ChartInlineInput';
import ColumnChartDescriptionEditor from './ColumnChartDescriptionEditor';
import BarChartContentEditor from './BarChartContentEditor';

const defaultEditor = {
  selection: initialElementsState.selection,
};

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  kind = chartTypes.BAR,
  addButtonRenderMap,
  selection,
  dispatch,
  editor = defaultEditor,
  textAlignment = defaultChartTextAlignment,
  title = defaultChartTitle,
  ...chartProps
}: Props) {
  chartProps.textAlignment = textAlignment;

  const dispatchElements = useAutoCallback((action: ElementsAction) => {
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
  });

  const resizeTargetRef = useResizeTargetRef();

  const handleTitleChange = useAutoCallback(({ currentTarget }) =>
    dispatch({
      type: UPDATE_BLOCK_BODY,
      body: { title: currentTarget.value },
    })
  );

  return (
    <>
      {selection.length === 1 && selection[0] === chartProps.id ? (
        <ChartLayout
          ref={resizeTargetRef}
          title={
            <ChartInlineInput
              onChange={handleTitleChange}
              textAlignment={textAlignment}
              value={title}
            />
          }
          description={
            kind === chartTypes.COLUMN ? (
              <ColumnChartDescriptionEditor
                {...chartProps}
                dispatchElements={dispatchElements}
              />
            ) : kind === chartTypes.LINE ? (
              <LineChartDescription {...chartProps} />
            ) : kind === chartTypes.PIE ? (
              <PieChartDescription {...chartProps} />
            ) : kind === chartTypes.BAR ? (
              <BarChartDescription {...chartProps} />
            ) : null
          }
          textAlignment={textAlignment}
        >
          <ChartSvg>
            {kind === chartTypes.BAR ? (
              <BarChartContent
                as={BarChartContentEditor}
                {...chartProps}
                dispatchElements={dispatchElements}
              />
            ) : kind === chartTypes.COLUMN ? (
              <ColumnChartContent {...chartProps} />
            ) : kind === chartTypes.PIE ? (
              <PieChartContent {...chartProps} />
            ) : kind === chartTypes.LINE ? (
              <LineChartContent {...chartProps} />
            ) : null}
          </ChartSvg>
        </ChartLayout>
      ) : (
        <Chart {...chartProps} kind={kind} />
      )}
      <BlockActions
        addButtonRenderMap={addButtonRenderMap}
        dispatch={dispatch}
        editor={editor}
        id={chartProps.id}
        selection={selection}
      />
    </>
  );
}
