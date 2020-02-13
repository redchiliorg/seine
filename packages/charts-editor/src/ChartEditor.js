// @flow
import * as React from 'react';
import { chartTypes, initialElementsState } from '@seine/core';
import { BlockActions } from '@seine/ui';
import {
  BarChart,
  BarChartDescription,
  Chart,
  ChartLayout,
  ChartSvg,
  ColumnChart,
  ColumnChartDescription,
  defaultChartTextAlignment,
  defaultChartTitle,
  LineChart,
  LineChartDescription,
  PieChart,
  PieChartDescription,
} from '@seine/charts';
import { useResizeTargetRef } from '@seine/styles';

import type { ChartEditorProps as Props } from './types';
import ChartTitleInput from './ChartTitleInput';

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
  editor = defaultEditor,
  mode,
  dispatch,
  ...chartProps
}: Props) {
  const {
    title = defaultChartTitle,
    textAlignment = defaultChartTextAlignment,
  } = chartProps;

  /*
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
   */

  const resizeTargetRef = useResizeTargetRef();

  return (
    <>
      {selection.length === 1 && selection[0] === chartProps.id ? (
        <ChartLayout
          ref={resizeTargetRef}
          title={
            <ChartTitleInput
              dispatch={dispatch}
              textAlignment={textAlignment}
              value={title}
            />
          }
          description={
            kind === chartTypes.COLUMN ? (
              <ColumnChartDescription {...chartProps} />
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
              <BarChart {...chartProps} />
            ) : kind === chartTypes.COLUMN ? (
              <ColumnChart {...chartProps} />
            ) : kind === chartTypes.PIE ? (
              <PieChart {...chartProps} />
            ) : kind === chartTypes.LINE ? (
              <LineChart {...chartProps} />
            ) : null}
          </ChartSvg>
        </ChartLayout>
      ) : (
        <Chart {...chartProps} />
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
