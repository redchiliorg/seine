// @flow
import * as React from 'react';
import type { ChartType } from '@seine/core/src/types';
import { useAutoMemo } from 'hooks.macro';
import {
  ChartLegend,
  defaultChartLegend,
  titleIdentityElements,
} from '@seine/charts';
import type { ChartLegendProps } from '@seine/charts';
import { UPDATE_BLOCK_ELEMENT_BY_ID } from '@seine/core';
import type { ElementsAction } from '@seine/core';

import ChartInlineInput from './ChartInlineInput';

type Props = $Rest<ChartLegendProps, {| kind: ChartType |}> & {
  dispatchElements: (ElementsAction) => void,
  legend?: boolean,
};

/**
 * @description Legend editor of column chart groups.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ChartGroupsDescriptionEditor({
  elements,
  legend = defaultChartLegend,
  dispatchElements,
  ...legendProps
}: Props) {
  return (
    <ChartLegend
      {...legendProps}
      elements={useAutoMemo(
        legend
          ? titleIdentityElements(elements).map(({ id, title }) => ({
              title: (
                <ChartInlineInput
                  key={id}
                  value={title}
                  onChange={({ currentTarget }) =>
                    dispatchElements({
                      type: UPDATE_BLOCK_ELEMENT_BY_ID,
                      body: { title: currentTarget.value },
                      id,
                    })
                  }
                />
              ),
            }))
          : []
      )}
    />
  );
}
