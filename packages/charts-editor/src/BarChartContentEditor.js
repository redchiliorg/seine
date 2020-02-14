import * as React from 'react';
import { SvgInput } from '@seine/styles';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';
import styled from 'styled-components/macro';

type Props = {};

const HiddenSvgGroup = styled.g`
  opacity: 0;
`;

/**
 * @description Editor of a chart with child inputs injection
 * @param {Props} props
 * @returns {React.Node}
 */
export default function BarChartContentEditor({
  children,
  dispatch,
  dispatchElements,
  editor,
  ...groupProps
}: Props) {
  return (
    <g {...groupProps}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.key) {
          const [source, index] = child.key.split('.');

          if (index && (source === 'value' || source === 'title')) {
            return [
              <HiddenSvgGroup>{child}</HiddenSvgGroup>,
              <SvgInput
                {...child.props}
                type={source === 'value' ? 'number' : 'text'}
                onChange={({ currentTarget }) =>
                  dispatchElements({
                    type: UPDATE_BLOCK_ELEMENT,
                    body: {
                      [source]:
                        source === 'value'
                          ? +currentTarget.value
                          : currentTarget.value,
                    },
                    index: +index,
                  })
                }
              >
                {child.props.children}
              </SvgInput>,
            ];
          }
        }
        return child;
      })}
    </g>
  );
}
