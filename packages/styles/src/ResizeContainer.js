// @flow
import * as React from 'react';
import { useAutoCallback, useAutoEffect, useAutoMemo } from 'hooks.macro';
import ResizeObserver from 'resize-observer-polyfill';

type Props = {
  as?: React.ElementType,
  children: React.ChildrenArray,
};

/**
 * @description  Reset state to render children on each resize.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ResizeContainer({
  as: Container = 'div',
  children,
  ...containerProps
}: Props) {
  const [resized, setResized] = React.useState(false);
  const resizeObservable = useAutoMemo(
    new ResizeObserver(() => {
      setResized(true);
    })
  );

  useAutoEffect(() => {
    if (resized) {
      setResized(false);
    }
  });

  return (
    <Container
      {...containerProps}
      ref={useAutoCallback((resizeTarget) => {
        if (resizeTarget) {
          resizeObservable.disconnect();
          resizeObservable.observe(resizeTarget);
        }
      })}
    >
      {React.Children.map(children, (child: React.Node) => {
        if (React.isValidElement(child)) {
          const Child = child.type;
          return <Child key={child.key} {...child.props} />;
        }
        return child;
      })}
    </Container>
  );
}
