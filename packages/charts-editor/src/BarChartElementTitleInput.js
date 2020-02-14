// @flow
import * as React from 'react';
import { SvgInput } from '@seine/styles';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import { useAutoCallback } from 'hooks.macro';

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
    meta: { index, title },
    ...inputProps
  }: Props,
  ref
) {
  return (
    <SvgInput
      {...inputProps}
      ref={ref}
      onChange={useAutoCallback(({ currentTarget }) =>
        dispatchElements({
          type: UPDATE_BLOCK_ELEMENT,
          index,
          body: { title: currentTarget.value },
        })
      )}
      value={title}
    />
  );
});
