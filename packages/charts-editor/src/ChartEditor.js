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
  Chart,
  ChartLayout,
  ChartSvg,
  ColumnChartContent,
  defaultChartTextAlignment,
  defaultChartTitle,
  LineChartContent,
  PieChartContent,
} from '@seine/charts';
import { useResizeTargetRef } from '@seine/styles';
import { useAutoCallback } from 'hooks.macro';
import stringify from 'virtual-dom-stringify';
import styled from 'styled-components';

import type { ChartEditorProps as Props } from './types';
import ChartInlineInput from './ChartInlineInput';
import ChartGroupsDescriptionEditor from './ChartGroupsDescriptionEditor';
import BarChartElementTitleInput from './BarChartElementTitleInput';
import BarChartElementValueInput from './BarChartElementValueInput';
import BarChartElementRect from './BarChartElementRect';
import { chartEditorFillPattern } from './constants';
import PieChartElementPath from './PieChartElementPath';
import PieChartElementTitleInput from './PieChartElementTitleInput';
import PieChartElementValueInput from './PieChartElementValueInput';
import ColumnChartElementRect from './ColumnChartElementRect';
import ChartGroupElementValueInput from './ChartGroupElementValueInput';
import ChartGroupTitleInput from './ChartGroupTitleInput';
import ChartDescriptionEditor from './ChartDescriptionEditor';
import LineChartElementPath from './LineChartElementPath';

const defaultEditor = {
  selection: initialElementsState.selection,
};

const Container = styled.div`
  position: relative;
  height: 100%;
`;

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  children,
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
    !!(selection && chartProps.elements) && (
      <Container>
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
              kind === chartTypes.PIE || kind === chartTypes.BAR ? (
                <ChartDescriptionEditor
                  {...chartProps}
                  dispatchElements={dispatchElements}
                />
              ) : kind === chartTypes.COLUMN || kind === chartTypes.LINE ? (
                <ChartGroupsDescriptionEditor
                  {...chartProps}
                  dispatchElements={dispatchElements}
                />
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
                <ColumnChartContent
                  {...chartProps}
                  editor={editor}
                  dispatch={dispatch}
                  dispatchElements={dispatchElements}
                  groupTitleAs={ChartGroupTitleInput}
                  elementRectAs={ColumnChartElementRect}
                  elementValueAs={ChartGroupElementValueInput}
                />
              ) : kind === chartTypes.PIE ? (
                <PieChartContent
                  {...chartProps}
                  editor={editor}
                  dispatch={dispatch}
                  dispatchElements={dispatchElements}
                  elementTitleAs={PieChartElementTitleInput}
                  elementValueAs={PieChartElementValueInput}
                  elementPathAs={PieChartElementPath}
                />
              ) : kind === chartTypes.LINE ? (
                <LineChartContent
                  {...chartProps}
                  editor={editor}
                  dispatch={dispatch}
                  dispatchElements={dispatchElements}
                  groupTitleAs={ChartGroupTitleInput}
                  elementValueAs={ChartGroupElementValueInput}
                  elementPathAs={LineChartElementPath}
                />
              ) : null}
            </ChartSvg>
          </ChartLayout>
        ) : (
          <Chart
            {...chartProps}
            title={title}
            textAlignment={textAlignment}
            kind={kind}
          />
        )}
        <BlockActions
          addButtonRenderMap={addButtonRenderMap}
          dispatch={dispatch}
          editor={editor}
          id={chartProps.id}
          selection={selection}
        />
      </Container>
    )
  );
}
