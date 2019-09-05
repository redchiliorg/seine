// @flow
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import styled from 'styled-components';

type Props = {
  children: React.ChildrenArray<React.Node>,
};

const Overlay = styled.div`
  position: absolute;
  z-index: 999;
  width: ${({ width }) => `${width}px` || '100%'};
  height: ${({ height }) => `${height}px` || '100%'};
`;

/**
 * @description Container component that renders over the block.
 *
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BlockOverlay({ children }: Props) {
  const overlayRef = React.useRef<HTMLDivElement | null>(null);
  const { current: overlay } = overlayRef;

  return (
    <>
      <Overlay ref={overlayRef} />
      {overlay && ReactDOM.createPortal(children, overlay)}
    </>
  );
}
