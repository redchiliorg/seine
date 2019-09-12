// @flow
import * as React from 'react';
import { UPDATE_BLOCK_EDITOR } from '@seine/core';

type Action = { type: string, [string]: * };
type Props = {
  dispatch: (Action) => any,
  index: number,
  children: React.ChildrenArray<React.Node>,
  as?: HTMLElement | SVGElement,
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
      ref={React.useCallback(
        (ref) =>
          ref &&
          setBox(
            ref instanceof SVGElement
              ? ref.getBBox()
              : ref.getBoundingClientRect()
          ),
        [setBox]
      )}
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
