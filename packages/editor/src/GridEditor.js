// @flow
import * as React from 'react';
import type { GridProps } from '@seine/content';
import { Grid } from '@seine/content';

type Props = GridProps & {
  id: string,
  dispatch: Function,
  selected: boolean,
};

/**
 * @description Grid content editor.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function GridEditor({
  id,
  dispatch,
  selection,
  children,
  ...gridProps
}: Props) {
  return <Grid {...gridProps}>{children}</Grid>;
}
