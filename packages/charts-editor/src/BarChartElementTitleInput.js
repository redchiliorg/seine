// @flow
import * as React from 'react';
import { SvgInput } from '@seine/styles';
import { UPDATE_BLOCK_ELEMENT_BY_ID } from '@seine/core';

type Props = {
  children?: any,
};

/**
 * @description Bar chart element title input for editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default React.forwardRef(function BarChartElementTitleInput(
  {
    dispatch,
    dispatchElements,
    editor,
    meta: { id, title },
    ...inputProps
  }: Props,
  ref
) {
  return (
    <SvgInput
      {...inputProps}
      ref={ref}
      onChange={({ currentTarget }) =>
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT_BY_ID,
          id,
          body: { title: currentTarget.value },
        })
      }
      value={title}
    />
  );
});
