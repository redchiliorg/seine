// @flow
import * as React from 'react';
import {
  BlockActions,
  BlockContainer,
  useSelectableBlockProps,
} from '@seine/ui';
import { Image } from '@seine/content';
import type { ChartProps } from '@seine/charts';
import type { BlockEditor } from '@seine/core';

type Props = (ChartProps & BlockEditor) & {};

/**
 * @description Image editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export function ImageEditor({
  addButtonRenderMap,
  dispatch,
  selection,
  id,
  ...imageProps
}: Props) {
  return (
    <BlockContainer {...useSelectableBlockProps({ id, selection }, dispatch)}>
      <BlockActions
        id={id}
        dispatch={dispatch}
        addButtonRenderMap={addButtonRenderMap}
      />
      <Image {...imageProps} />
    </BlockContainer>
  );
}
