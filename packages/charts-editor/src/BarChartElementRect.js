// @flow
import * as React from 'react';
import { DESELECT_BLOCK_ELEMENT, SELECT_BLOCK_ELEMENT } from '@seine/core';
import { ClickAwayListener } from '@material-ui/core';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element title input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartElementRect({
  dispatch,
  dispatchElements,
  editor,
  meta: { index },
  ...rectProps
}: Props) {
  return (
    <ClickAwayListener
      onClickAway={(event) =>
        !(event.target instanceof HTMLButtonElement) &&
        dispatchElements({
          type: DESELECT_BLOCK_ELEMENT,
          index,
        })
      }
    >
      <rect
        {...rectProps}
        {...(editor.selection === index
          ? {
              strokeDasharray: 0.25,
              stroke: 'black',
            }
          : {
              onClick: (event) => {
                event.stopPropagation();
                event.preventDefault();
                dispatchElements({
                  index,
                  type: SELECT_BLOCK_ELEMENT,
                });
              },
            })}
      />
    </ClickAwayListener>
  );
}
