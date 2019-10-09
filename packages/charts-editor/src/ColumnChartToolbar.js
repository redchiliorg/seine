// @flow
import * as React from 'react';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import type { BlockDeleteButton } from '@seine/ui';
import { Toolbar } from '@seine/ui';
import {
  defaultChartBody,
  defaultChartEditor,
  defaultChartFormat,
} from '@seine/charts';

import ChartElementAddButton from './ChartElementAddButton';
import ChartMinValueInput from './ChartMinValueInput';
import ChartMaxValueInput from './ChartMaxValueInput';
import ChartValueStepInput from './ChartValueStepInput';
import ChartElementColorButton from './ChartElementColorButton';
import ChartPaletteSelect from './ChartPaletteSelect';
import ChartElementRemoveByIdButton from './ChartElementRemoveByIdButton';
import ChartGroupAddButton from './ChartGroupAddButton';
import ChartSwitchFormatInput from './ChartSwitchFormatInput';
import ChartUnitsInput from './ChartUnitsInput';
import ChartGroupRemoveButton from './ChartGroupRemoveButton';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockDeleteButton>,
};

/**
 * @description Action buttons to edit currently selected column chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ColumnChartToolbar({
  id,
  editor,
  format,
  body,
  dispatch,
  children,
}: Props) {
  body = body || defaultChartBody;
  editor = editor || defaultChartEditor;
  format = format || defaultChartFormat;
  return (
    <Toolbar>
      <ChartGroupAddButton
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      <ChartGroupRemoveButton
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      {editor.selection > -1 && (
        <>
          <ChartElementRemoveByIdButton
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />
          <Toolbar.Separator />
        </>
      )}

      <ChartElementAddButton
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      {editor.selection > -1 && (
        <>
          <ChartElementColorButton
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />
          <Toolbar.Separator />
        </>
      )}

      {editor.selection === -1 && (
        <>
          <ChartPaletteSelect
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />
          <Toolbar.Separator />
        </>
      )}

      <ChartUnitsInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      <ChartMinValueInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <ChartMaxValueInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <ChartValueStepInput
        body={body}
        dispatch={dispatch}
        editor={editor}
        format={format}
        id={id}
      />

      <Toolbar.Separator />

      <ChartSwitchFormatInput
        dispatch={dispatch}
        format={format}
        label={'y'}
        id={id}
        name={'yAxis'}
      />

      <Toolbar.Separator />

      {children}
    </Toolbar>
  );
}
