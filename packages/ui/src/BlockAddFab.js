// @flow
import * as React from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import MuiFab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import type {
  BlocksAction,
  BlocksCreateAction,
} from '@seine/core/src/reducers';
import type { Block } from '@seine/core/src/types';

import ColumnChartAddButton from './ColumnChartAddButton';
import BarChartAddButton from './BarChartAddButton';
import DraftAddButton from './DraftAddButton';
import PieChartAddButton from './PieChartAddButton';
import LineChartAddButton from './LineChartAddButton';

const Fab = styled(MuiFab)`
  opacity: 0.5;
  :hover {
    opacity: inherit;
  }
`;

type Props = $Rest<BlocksCreateAction, {| block: Block |}> & {
  children?: React.Node,
  dispatch: (BlocksAction) => any,
};

/**
 * @description Fab that opens menu with block type selection to add.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockAddFab(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  return (
    <>
      <Fab
        size={'small'}
        onClick={React.useCallback((event) => {
          event.stopPropagation();
          setAnchorEl(event.currentTarget);
        }, [])}
      >
        <AddIcon />
      </Fab>

      <Menu
        anchorEl={anchorEl}
        onClose={React.useCallback((event) => {
          event.stopPropagation();
          setAnchorEl(null);
        }, [])}
        open={!!anchorEl}
      >
        <DraftAddButton {...props} variant={'text'} fullWidth />
        <PieChartAddButton {...props} variant={'text'} fullWidth />
        <BarChartAddButton {...props} variant={'text'} fullWidth />
        <ColumnChartAddButton {...props} variant={'text'} fullWidth />
        <LineChartAddButton {...props} variant={'text'} fullWidth />
      </Menu>
    </>
  );
}
