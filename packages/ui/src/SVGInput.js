// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  children: HTMLElement,
  onChange: (DOMRectReadOnly) => any,
};

/**
 * @description SVG Input
 * @param {Props} props
 * @returns {React.Node}
 */
export default function SVGInput({ children, onChange }: Props) {
  const [box, setBox] = React.useState<DOMRectReadOnly>(null);
  React.useLayoutEffect(() => {
    if (box) {
      onChange({ x: box.x, y: box.y, width: box.width, height: box.height });
    }
  }, [box, onChange]);

  return (
    <g ref={React.useCallback((ref) => ref && setBox(ref.getBBox()), [setBox])}>
      {React.Children.map(children, (child, index) =>
        child && child.type === 'text' ? (
          <child.type key={index} {...child.props} opacity={0} />
        ) : (
          child
        )
      )}
    </g>
  );
}

type InputProps = {
  as: React.ComponentType<any>,
  bBox: DOMRectReadOnly,
  overlayBox: DOMRectReadOnly,
  size: number,
} & HTMLInputElement;

SVGInput.Input = styled.input`
  background-color: transparent;
  border: none;
  && {
    margin: 0;
    padding: 0;
    ${({
      type,
      fontSize,
      width = 'auto',
      textAlign = 'left',
    }: InputProps) => css`
      width: ${width};
      font-family: inherit;
      font-size: ${fontSize};
      text-align: ${textAlign};
      margin-left: ${type === 'number' ? 7 : 0}px;
      max-width: 100%;
    `}
  }
`;
