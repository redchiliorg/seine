// @flow
import * as React from 'react';

export type Props = {
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
