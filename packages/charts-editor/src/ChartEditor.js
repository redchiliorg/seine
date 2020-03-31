// @flow
import * as React from 'react';
import type { ElementsAction } from '@seine/core';
import {
  chartTypes,
  DESELECT_BLOCK_ELEMENT,
  initialElementsState,
  reduceElements,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
  UPDATE_BLOCK_FORMAT,
} from '@seine/core';
import { BlockActions, InlineInput } from '@seine/ui';
import {
  BarChartContent,
  Chart,
  ChartLayout,
  ChartSvg,
  ChartSvgDefs,
  ColumnChartContent,
  LineChartContent,
  PieChartContent,
  useChartFormatDefaults,
  useChartSvgProps,
} from '@seine/charts';
import { useResizeTargetRef } from '@seine/styles';
import { useAutoCallback } from 'hooks.macro';

import type { ChartEditorProps as Props } from './types';
import ChartGroupsDescriptionEditor from './ChartGroupsDescriptionEditor';
import BarChartElementTitleInput from './BarChartElementTitleInput';
import BarChartElementValueInput from './BarChartElementValueInput';
import BarChartElementRect from './BarChartElementRect';
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

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  children,
  addButtonRenderMap,
  selection,
  dispatch,
  editor = defaultEditor,
  kind = chartTypes.BAR,

  ...chartProps
}: Props) {
  chartProps = useChartFormatDefaults(kind, chartProps);

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

  const handleAutoFormat = useAutoCallback((format) =>
    dispatch({
      type: UPDATE_BLOCK_FORMAT,
      format,
    })
  );

  const blockActions = (
    <BlockActions
      addButtonRenderMap={addButtonRenderMap}
      dispatch={dispatch}
      editor={editor}
      id={chartProps.id}
      selection={selection}
    />
  );

  const metaProps = { editor, dispatch, dispatchElements };

  const deselectClickHandler = useAutoCallback(
    (event) =>
      editor.selection > -1 &&
      (event.target === event.currentTarget ||
        event.target instanceof HTMLHtmlElement) &&
      dispatchElements({
        type: DESELECT_BLOCK_ELEMENT,
        index: editor.selection,
      })
  );

  const svgProps = useChartSvgProps(kind);

  return selection.length === 1 && selection[0] === chartProps.id ? (
    <ChartLayout
      ref={resizeTargetRef}
      title={
        <InlineInput
          onChange={handleTitleChange}
          textAlignment={chartProps.textAlignment}
          value={chartProps.title}
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
      textAlignment={chartProps.textAlignment}
      overflow={kind === chartTypes.PIE ? 'hidden' : 'visible'}
    >
      <ChartSvg onClick={deselectClickHandler} {...svgProps}>
        <ChartSvgDefs />
        {kind === chartTypes.BAR ? (
          <BarChartContent
            {...chartProps}
            {...metaProps}
            elementRectAs={BarChartElementRect}
            elementTitleAs={BarChartElementTitleInput}
            elementValueAs={BarChartElementValueInput}
          />
        ) : kind === chartTypes.COLUMN ? (
          <ColumnChartContent
            {...chartProps}
            {...metaProps}
            elementRectAs={ColumnChartElementRect}
            elementValueAs={ChartGroupElementValueInput}
            groupTitleAs={ChartGroupTitleInput}
          />
        ) : kind === chartTypes.LINE ? (
          <LineChartContent
            {...chartProps}
            {...metaProps}
            elementPathAs={LineChartElementPath}
            elementValueAs={ChartGroupElementValueInput}
            groupTitleAs={ChartGroupTitleInput}
          />
        ) : kind === chartTypes.PIE ? (
          <PieChartContent
            {...chartProps}
            {...metaProps}
            elementPathAs={PieChartElementPath}
            elementTitleAs={PieChartElementTitleInput}
            elementValueAs={PieChartElementValueInput}
            onAutoFormat={handleAutoFormat}
          />
        ) : null}
      </ChartSvg>
      {blockActions}
    </ChartLayout>
  ) : (
    <Chart {...chartProps} kind={kind}>
      {blockActions}
    </Chart>
  );
}
