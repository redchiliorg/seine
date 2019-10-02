// @flow
import * as React from 'react';
import type { Action, Block, BlockId, ChartBody } from '@seine/core';
import type { BlockToolbarGroup } from '@seine/ui';
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
import ChartGroupAddButton from './ChartGroupAddButton';
import ChartGroupRemoveButton from './ChartGroupRemoveButton';
import ChartElementRemoveByIdButton from './ChartElementRemoveByIdButton';
import ChartElementColorButton from './ChartElementColorButton';
import ChartPaletteSelect from './ChartPaletteSelect';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

/**
 * @description Action buttons to edit currently selected column chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function LineChartToolbar({
  body,
  children,
  dispatch,
  editor,
  format,
  id,
}: Props) {
  body = body || defaultChartBody;
  editor = editor || defaultChartEditor;
  format = format || defaultChartFormat;
  return (
    <Toolbar>
      <Toolbar.Group>
        {editor.selection > -1 ? (
          <>
            <ChartElementRemoveByIdButton
              body={body}
              dispatch={dispatch}
              editor={editor}
              format={format}
              id={id}
            >
              rm line
            </ChartElementRemoveByIdButton>
            <ChartElementColorButton
              body={body}
              dispatch={dispatch}
              editor={editor}
              format={format}
              id={id}
            />
          </>
        ) : (
          <ChartPaletteSelect
            body={body}
            dispatch={dispatch}
            editor={editor}
            format={format}
            id={id}
          />
        )}
      </Toolbar.Group>

      <Toolbar.Separator />

      <Toolbar.Group>
        <ChartGroupAddButton
          body={body}
          dispatch={dispatch}
          editor={editor}
          format={format}
          id={id}
        >
          Add point
        </ChartGroupAddButton>

        <ChartGroupRemoveButton
          body={body}
          dispatch={dispatch}
          editor={editor}
          format={format}
          id={id}
        >
          Remove point
        </ChartGroupRemoveButton>

        <ChartElementAddButton
          body={body}
          dispatch={dispatch}
          editor={editor}
          format={format}
          id={id}
        >
          Add line
        </ChartElementAddButton>
      </Toolbar.Group>

      <Toolbar.Separator />

      <Toolbar.Group>
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
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}
