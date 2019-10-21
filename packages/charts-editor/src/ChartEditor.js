// @flow
import * as React from 'react';
import { AppBar, Box, Dialog, IconButton, Toolbar } from '@material-ui/core';
import {
  Close as CloseIcon,
  Fullscreen as FullscreenIcon,
} from '@material-ui/icons';
import type { BlockEditor, ChartType, ElementsAction } from '@seine/core';
import {
  chartTypes,
  DESELECT_ALL_BLOCKS,
  initialElementsState,
  reduceElements,
  SELECT_BLOCK,
  UPDATE_BLOCK_BODY,
  UPDATE_BLOCK_EDITOR,
} from '@seine/core';
import {
  ActionButton,
  BlockActions,
  BlockActionsGroup,
  BlockActionsItem,
  BlockFab,
} from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import {
  BarChart,
  ChartContainer,
  ColumnChart,
  defaultChartRenderMap,
  LineChart,
  PieChart,
} from '@seine/charts';

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
  [chartTypes.PIE]: (props) => <PieChart {...props} as={PieChartEditor} />,
  [chartTypes.BAR]: (props) => <BarChart {...props} as={BarChartEditor} />,
  [chartTypes.COLUMN]: (props) => (
    <ColumnChart {...props} as={ColumnChartEditor} />
  ),
  [chartTypes.LINE]: (props) => <LineChart {...props} as={LineChartEditor} />,
};

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
  chartRenderMap: { [kind]: ExactChart } = defaultChartRenderMap,
  chartEditorRenderMap: {
    [kind]: ExactChartEditor,
  } = defaultChartEditorRenderMap,
  dispatch,
  editor = defaultEditor,
  mode,
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
          editor: {
            selection: editor.selection,
          },
        });
      }
    },
    [chartProps.elements, editor, dispatch]
  );

  return (
    <ChartContainer>
      <BlockActions
        addButtonRenderMap={addButtonRenderMap}
        dispatch={dispatch}
        id={chartProps.id}
        selection={selection}
        editor={editor}
      >
        <BlockActionsGroup
          alignItems={'center'}
          container
          justify={'space-around'}
        >
          <BlockActionsItem item>
            <ActionButton
              as={BlockFab}
              dispatch={dispatch}
              id={chartProps.id}
              mode={'fullscreen'}
              size={'small'}
              type={SELECT_BLOCK}
            >
              <FullscreenIcon />
            </ActionButton>
          </BlockActionsItem>
        </BlockActionsGroup>
      </BlockActions>

      <Dialog
        fullScreen
        open={
          selection.length === 1 &&
          selection[0] === chartProps.id &&
          mode === 'fullscreen'
        }
      >
        <AppBar position={'relative'}>
          <Toolbar>
            <ActionButton
              ariaLabel={'close'}
              as={IconButton}
              color={'inherit'}
              dispatch={dispatch}
              edge={'start'}
              type={DESELECT_ALL_BLOCKS}
            >
              <CloseIcon />
            </ActionButton>
          </Toolbar>
        </AppBar>
        <Box padding={10}>
          <ExactChartEditor
            dispatch={dispatch}
            dispatchElements={dispatchElements}
            editor={editor}
            selection={selection}
            {...chartProps}
          />
        </Box>
      </Dialog>

      <ExactChart {...chartProps} />
    </ChartContainer>
  );
}
