// @flow
import * as React from 'react';
import { Dialog, IconButton as MuiIconButton } from '@material-ui/core';
import {
  Close as CloseIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import type { BlockEditor, ChartType, ElementsAction } from '@seine/core';
import {
  blockTypes,
  chartTypes,
  DELETE_BLOCK,
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
  Fab,
  Toolbar,
} from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import {
  BarChart,
  ChartContainer,
  ColumnChart,
  defaultChartRenderMap,
  defaultChartTextAlignment,
  LineChart,
  PieChart,
} from '@seine/charts';
import styled from 'styled-components/macro';

import type { ChartEditorProps } from './types';
import ChartToolbar from './ChartToolbar';
import ChartTextAlignmentButton from './ChartTextAlignmentButton';
import ChartEditorChildren from './ChartEditorChildren';

type Props = (ChartProps & BlockEditor) & {
  chartEditorRenderMap?: {
    [kind: ChartType]: React.ComponentType<ChartEditorProps>,
  },
};

const defaultChartEditorRenderMap = {
  [chartTypes.PIE]: (props) => <PieChart {...props} as={ChartEditorChildren} />,
  [chartTypes.BAR]: (props) => <BarChart {...props} as={ChartEditorChildren} />,
  [chartTypes.COLUMN]: (props) => (
    <ColumnChart {...props} as={ChartEditorChildren} />
  ),
  [chartTypes.LINE]: (props) => (
    <LineChart {...props} as={ChartEditorChildren} />
  ),
};

const defaultEditor = {
  selection: initialElementsState.selection,
};

const IconButton = styled(MuiIconButton)`
  opacity: ${({ selected = true }) => (selected ? 1.0 : 0.5)};
`;

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
  textAlignment = defaultChartTextAlignment,
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
          editor: { selection },
        });
      }
    },
    [chartProps.elements, dispatch, editor.selection]
  );

  const { elements, title, ...format } = chartProps;

  return (
    <ChartContainer>
      <Dialog
        fullScreen
        open={
          selection.length === 1 &&
          selection[0] === chartProps.id &&
          mode === 'fullscreen'
        }
        scroll={'body'}
      >
        <ChartToolbar
          id={chartProps.id}
          body={{ elements, title }}
          format={{ ...format, kind }}
          dispatch={dispatch}
          editor={editor}
          mode={mode}
          parent_id={chartProps.parent_id}
          selection={selection}
          type={blockTypes.CHART}
          position={'fixed'}
        >
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

          <Toolbar.Separator />

          <ChartTextAlignmentButton
            as={IconButton}
            dispatch={dispatch}
            selected={textAlignment === 'left'}
            value={'left'}
            title={'Align title to left'}
          />
          <ChartTextAlignmentButton
            as={IconButton}
            dispatch={dispatch}
            selected={textAlignment === 'center'}
            value={'center'}
            title={'Align title to center'}
          />
          <ChartTextAlignmentButton
            as={IconButton}
            selected={textAlignment === 'right'}
            dispatch={dispatch}
            value={'right'}
            title={'Align title to right'}
          />

          <Toolbar.Separator />
        </ChartToolbar>

        <ChartContainer marginTop={96}>
          <ExactChartEditor
            dispatch={dispatch}
            dispatchElements={dispatchElements}
            editor={editor}
            selection={selection}
            textAlignment={textAlignment}
            {...chartProps}
          />
        </ChartContainer>
      </Dialog>
      <ExactChart textAlignment={textAlignment} {...chartProps} />
      {mode !== 'fullscreen' && (
        <BlockActions
          addButtonRenderMap={addButtonRenderMap}
          direction={'column'}
          dispatch={dispatch}
          editor={editor}
          id={chartProps.id}
          notSelectable
          selection={selection}
        >
          <BlockActionsGroup
            alignItems={'center'}
            container
            justify={'space-around'}
          >
            <BlockActionsItem item>
              <ActionButton
                as={Fab}
                dispatch={dispatch}
                id={chartProps.id}
                mode={'fullscreen'}
                size={'small'}
                title={'Edit content'}
                type={SELECT_BLOCK}
                color={'primary'}
              >
                <EditIcon />
              </ActionButton>
              &nbsp;
              <ActionButton
                as={Fab}
                color={'secondary'}
                dispatch={dispatch}
                id={chartProps.id}
                size={'small'}
                type={DELETE_BLOCK}
                title={'Delete block'}
              >
                <DeleteIcon />
              </ActionButton>
            </BlockActionsItem>
          </BlockActionsGroup>
        </BlockActions>
      )}
    </ChartContainer>
  );
}
