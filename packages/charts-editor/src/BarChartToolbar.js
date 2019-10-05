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

import ChartElementColorButton from './ChartElementColorButton';
import ChartElementRemoveButton from './ChartElementRemoveButton';
import ChartPaletteSelect from './ChartPaletteSelect';
import ChartElementAddButton from './ChartElementAddButton';
import ChartSwitchFormatInput from './ChartSwitchFormatInput';

type Props = Block & {
  dispatch: (Action) => any,
  body: ChartBody,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
};

/**
 * @description Action buttons to edit currently selected bar chart.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartToolbar({
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
        <ChartElementAddButton
          body={body}
          dispatch={dispatch}
          editor={editor}
          format={format}
          id={id}
        />
        {editor.selection > -1 ? (
          <>
            <ChartElementRemoveButton
              body={body}
              dispatch={dispatch}
              editor={editor}
              format={format}
              id={id}
            />
            <ChartElementColorButton
              body={body}
              dispatch={dispatch}
              editor={editor}
              format={format}
              id={id}
            />
          </>
        ) : (
          <>
            <Toolbar.Separator />
            <ChartPaletteSelect
              body={body}
              dispatch={dispatch}
              editor={editor}
              format={format}
              id={id}
            />
          </>
        )}
      </Toolbar.Group>

      <Toolbar.Separator />

      <Toolbar.Group>
        <ChartSwitchFormatInput
          dispatch={dispatch}
          format={format}
          label={'x axis'}
          id={id}
          name={'xAxis'}
        />
      </Toolbar.Group>
      {children}
    </Toolbar>
  );
}
