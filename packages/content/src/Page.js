// @flow
import * as React from 'react';
import type { PageBody, PageFormat } from '@seine/core';

export type Props = (PageBody & PageFormat) & {
  children: React.ChildrenArray<React.Node>,
};

/**
 * @description Virtual block of type Page.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Page({ children }: Props) {
  return children;
}
