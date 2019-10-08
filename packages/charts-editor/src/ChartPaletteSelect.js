// @flow
import * as React from 'react';
import {
  chartPaletteKeyValues,
  defaultChartFormat,
  defaultChartPaletteKey,
} from '@seine/charts';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import MuiSelect from '@material-ui/core/Select';
import styled, { css } from 'styled-components';

const Label = styled.span.attrs(({ role = 'option' }) => ({ role }))`
  font-weight: bold;
  ${(props) =>
    css`
      color: ${props.color};
    `}
`;

const Select = styled(MuiSelect)`
  height: 100%;
`;

/**
 * @description Buttons to select chart's default palette
 * @returns {*}
 */
export default function ChartPaletteSelect({
  dispatch,
  format: { paletteKey = defaultChartPaletteKey } = defaultChartFormat,
  id,
}) {
  return (
    <FormControl>
      <Select
        value={paletteKey}
        onChange={React.useCallback(
          (event) => {
            const paletteKey = event.target.value;
            dispatch(
              {
                format: {
                  palette: chartPaletteKeyValues[paletteKey],
                  paletteKey,
                },
                id,
                type: UPDATE_BLOCK_FORMAT,
              },
              []
            );
          },
          [dispatch, id]
        )}
        row
      >
        <MenuItem value={'default'}>
          <Label color={chartPaletteKeyValues.default[3]}>
            General Palette
          </Label>
        </MenuItem>

        <MenuItem value={'mcKinseyDeep'}>
          <Label color={chartPaletteKeyValues.mcKinseyDeep[0]}>
            McKinsey Deep
          </Label>
        </MenuItem>

        <MenuItem value={'mcKinseyLight'}>
          <Label color={chartPaletteKeyValues.mcKinseyLight[0]}>
            McKinsey Light
          </Label>
        </MenuItem>

        <MenuItem value={'bcg'}>
          <Label color={chartPaletteKeyValues.bcg[0]}>BCG</Label>
        </MenuItem>

        <MenuItem value={'black'}>
          <Label color={chartPaletteKeyValues.black[0]}>Black</Label>
        </MenuItem>
      </Select>
    </FormControl>
  );
}
