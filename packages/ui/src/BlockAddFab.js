// @flow
import * as React from 'react';
import styled from 'styled-components';
import MuiFab from '@material-ui/core/Fab';
import Menu from '@material-ui/core/Menu';
import AddIcon from '@material-ui/icons/Add';
import type {
  BlocksAction,
  BlocksCreateAction,
} from '@seine/core/src/reducers';
import type { Block } from '@seine/core/src/types';

import BarChartAddButton from './BarChartAddButton';
import DraftAddButton from './DraftAddButton';
import PieChartAddButton from './PieChartAddButton';
import LineChartAddButton from './LineChartAddButton';
import ColumnChartAddButton from './ColumnChartAddButton';

const Fab = styled(MuiFab)`
  opacity: 0.5;
  &:hover {
    opacity: inherit;
  }
`;

type Props = $Rest<BlocksCreateAction, {| block: Block |}> & {
  children?: React.Node,
  dispatch: (BlocksAction) => any,
};

/**
 * @description Fab that opens menu with block types to add.
 * @param {*} props
 * @returns {React.Node}
 */
export default function BlockAddFab(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClose = React.useCallback((event) => {
    event.stopPropagation();
    setAnchorEl(null);
  }, []);

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

      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <div onClick={handleClose}>
          <DraftAddButton {...props} variant={'text'} fullWidth />
        </div>

        <div onClick={handleClose}>
          <PieChartAddButton {...props} variant={'text'} fullWidth />
        </div>

        <div onClick={handleClose}>
          <BarChartAddButton {...props} variant={'text'} fullWidth />
        </div>

        <div onClick={handleClose}>
          <ColumnChartAddButton {...props} variant={'text'} fullWidth />
        </div>

        <div onClick={handleClose}>
          <LineChartAddButton {...props} variant={'text'} fullWidth />
        </div>
      </Menu>
    </>
  );
}
