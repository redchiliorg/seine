// @flow
import * as React from 'react';
import { UPDATE_BLOCK_EDITOR } from '@seine/core';
import type { Action } from '@seine/core';

type Props = {
  dispatch: (Action) => any,
  index: number,
  children: React.ChildrenArray<React.Node>,
  as?: React.ElementType,
};

/**
 * @description Editable svg element.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function EditableElement({
  dispatch,
  index,
  children,
  as: Element = 'g',
}: Props) {
  const [box, setBox] = React.useState<DOMRectReadOnly>(null);

  React.useLayoutEffect(() => {
    box &&
      dispatch({
        type: UPDATE_BLOCK_EDITOR,
        editor: {
          [index]: {
            x: box.x,
            y: box.y,
            width: box.width,
            height: box.height,
          },
        },
      });
  }, [box, dispatch, index]);

  return (
    <Element
      ref={React.useCallback((ref) => ref && setBox(ref.getBBox()), [setBox])}
    >
      {React.Children.map(children, (child: React.Node, index) => (
        <React.Fragment key={index}>
          {child && child.type === 'text' ? (
            <child.type {...child.props} opacity={0} />
          ) : (
            child
          )}
        </React.Fragment>
      ))}
    </Element>
  );
}
