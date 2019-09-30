// @flow
import * as React from 'react';
import type { BlocksAction, ChartType, ElementsAction } from '@seine/core';
import {
  chartTypes,
  initialElementsState,
  reduceElements,
  UPDATE_BLOCK_BODY,
} from '@seine/core';
import { BlockContainer, useSelectableBlockProps } from '@seine/ui';
import type { ChartProps } from '@seine/charts';
import { Chart, defaultChartRenderMap } from '@seine/charts';

import type { ChartEditorProps } from './types';
import PieChartEditor from './PieChartEditor';
import BarChartEditor from './BarChartEditor';
import ColumnChartEditor from './ColumnChartEditor';
import LineChartEditor from './LineChartEditor';

type Props = ChartProps & {
  id: string,
  dispatch: (BlocksAction) => any,
  chartEditorRenderMap: {
    [kind: ChartType]: React.ComponentType<ChartEditorProps>,
  },
};

const defaultChartEditorRenderMap = {
  ...defaultChartRenderMap,
  [chartTypes.PIE]: (props) => <Chart as={PieChartEditor} {...props} />,
  [chartTypes.BAR]: (props) => <Chart as={BarChartEditor} {...props} />,
  [chartTypes.COLUMN]: (props) => <Chart as={ColumnChartEditor} {...props} />,
  [chartTypes.LINE]: (props) => <Chart as={LineChartEditor} {...props} />,
};

/**
 * @description Chart editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartEditor({
  dispatch,

  kind = chartTypes.BAR,
  chartEditorRenderMap: {
    [kind]: ExactChartEditor,
  } = defaultChartEditorRenderMap,
  ...chartProps
}: Props) {
  const [elementsSelection, setElementsSelection] = React.useState<number>(
    initialElementsState.selection
  );

  const dispatchElements = React.useCallback(
    (action: ElementsAction) => {
      const { elements, selection } = reduceElements(
        {
          elements: chartProps.elements,
          selection: elementsSelection,
        },
        action
      );
      if (selection !== elementsSelection) {
        setElementsSelection(selection);
      }
      dispatch({
        type: UPDATE_BLOCK_BODY,
        body: { elements },
      });
    },
    [chartProps.elements, elementsSelection, dispatch]
  );

  return (
    <BlockContainer
      {...useSelectableBlockProps(
        {
          id: chartProps.id,
          selection: chartProps.selection,
        },
        dispatch
      )}
    >
      {!!(
        chartProps.selection.length === 1 &&
        chartProps.selection[0] === chartProps.id
      ) ? (
        <ExactChartEditor
          dispatch={dispatchElements}
          kind={kind}
          {...chartProps}
        />
      ) : (
        <Chart kind={kind} {...chartProps} />
      )}
    </BlockContainer>
  );
}
