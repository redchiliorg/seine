// @flow
import * as React from 'react';

import type { Props as GridProps } from './Grid';
import Grid from './Grid';

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
  selected,
  children,
  ...gridProps
}: Props) {
  return <Grid {...gridProps}>{children}</Grid>;
}
