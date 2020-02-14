// @flow
import * as React from 'react';
import type { ElementsAction } from '@seine/core';
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
import stringify from 'virtual-dom-stringify';

import type { ChartEditorProps as Props } from './types';
import ChartInlineInput from './ChartInlineInput';
import ColumnChartDescriptionEditor from './ColumnChartDescriptionEditor';
import BarChartElementTitleInput from './BarChartElementTitleInput';
import BarChartElementValueInput from './BarChartElementValueInput';
import BarChartElementRect from './BarChartElementRect';
import { chartEditorFillPattern } from './constants';

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
    !!selection && (
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
              kind === chartTypes.BAR ? (
                <BarChartDescription
                  {...chartProps}
                  dispatchElements={dispatchElements}
                />
              ) : kind === chartTypes.LINE ? (
                <LineChartDescription {...chartProps} />
              ) : kind === chartTypes.PIE ? (
                <PieChartDescription {...chartProps} />
              ) : kind === chartTypes.COLUMN ? (
                <ColumnChartDescriptionEditor {...chartProps} />
              ) : null
            }
            textAlignment={textAlignment}
          >
            <ChartSvg>
              <defs
                dangerouslySetInnerHTML={{
                  __html: stringify(chartEditorFillPattern),
                }}
              />
              ;
              {kind === chartTypes.BAR ? (
                <BarChartContent
                  {...chartProps}
                  editor={editor}
                  dispatch={dispatch}
                  dispatchElements={dispatchElements}
                  elementTitleAs={BarChartElementTitleInput}
                  elementValueAs={BarChartElementValueInput}
                  elementRectAs={BarChartElementRect}
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
    )
  );
}
