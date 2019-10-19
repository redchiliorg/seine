// @flow
import * as React from 'react';
import { BlockActions } from '@seine/ui';
import { Image, ImageContainer } from '@seine/content';
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
    <ImageContainer>
      <Image {...imageProps} />
      <BlockActions
        addButtonRenderMap={addButtonRenderMap}
        dispatch={dispatch}
        id={id}
        selection={selection}
      />
    </ImageContainer>
  );
}
