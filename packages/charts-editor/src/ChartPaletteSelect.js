// @flow
import * as React from 'react';
import {
  chartPaletteBCG,
  chartPaletteBlack,
  chartPaletteMcKinseyDeep,
  chartPaletteMcKinseyLight,
  defaultChartPalette,
} from '@seine/charts';
import { ActionButton } from '@seine/ui';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import styled, { css } from 'styled-components';

const ButtonText = styled.span`
  font-weight: bold;
  ${(props) =>
    css`
      color: ${props.color};
    `}
`;

/**
 * @description Buttons to select chart's default palette
 * @returns {*}
 */
export default function ChartPaletteSelect({ dispatch, id }) {
  return (
    <>
      <ActionButton
        dispatch={dispatch}
        format={{ palette: defaultChartPalette }}
        id={id}
        type={UPDATE_BLOCK_FORMAT}
      >
        <ButtonText color={defaultChartPalette[3]}>General</ButtonText>
      </ActionButton>

      <ActionButton
        dispatch={dispatch}
        format={{ palette: chartPaletteMcKinseyDeep }}
        id={id}
        type={UPDATE_BLOCK_FORMAT}
      >
        <ButtonText color={chartPaletteMcKinseyDeep[0]}>
          McKinsey Deep
        </ButtonText>
      </ActionButton>

      <ActionButton
        dispatch={dispatch}
        format={{ palette: chartPaletteMcKinseyLight }}
        id={id}
        type={UPDATE_BLOCK_FORMAT}
      >
        <ButtonText color={chartPaletteMcKinseyLight[0]}>
          McKinsey Light
        </ButtonText>
      </ActionButton>

      <ActionButton
        dispatch={dispatch}
        format={{ palette: chartPaletteBCG }}
        id={id}
        type={UPDATE_BLOCK_FORMAT}
      >
        <ButtonText color={chartPaletteBCG[0]}>BCG</ButtonText>
      </ActionButton>

      <ActionButton
        dispatch={dispatch}
        format={{ palette: chartPaletteBlack }}
        id={id}
        type={UPDATE_BLOCK_FORMAT}
      >
        <ButtonText color={chartPaletteBlack[0]}>Black</ButtonText>
      </ActionButton>
    </>
  );
}
