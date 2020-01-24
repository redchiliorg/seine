// @flow
import * as React from 'react';
import { SvgInput, SvgTypography } from '@seine/styles';
import type { ElementsAction } from '@seine/core';
import { UPDATE_BLOCK_ELEMENT } from '@seine/core';

type Props = {
  child: React.ElementType,
  dispatchElements: (ElementsAction) => any,
};

/**
 * @description Inject editor inputs for chart component children.
 * @param {Props} props
 * @returns {React.Node}
 */
function ChartEditorChild({ child, dispatchElements }: Props) {
  if (React.isValidElement(child)) {
    const {
      type: Component,
      props: { children = null, ...childProps },
      ref,
      key,
    } = child;

    switch (Component) {
      case SvgTypography: {
        return (
          <SvgInput
            {...childProps}
            {...(children && { children })}
            ref={ref}
            key={key}
            onChange={({ currentTarget }) =>
              dispatchElements({
                type: UPDATE_BLOCK_ELEMENT,
                body: { [key]: currentTarget.value },
                index: childProps.index,
              })
            }
          />
        );
      }
      default: {
        return (
          <Component
            {...childProps}
            ref={ref}
            key={key}
            {...(children && {
              children: React.Children(children).map((child) => (
                <ChartEditorChild
                  child={child}
                  dispatchElements={dispatchElements}
                />
              )),
            })}
          />
        );
      }
    }
  }

  return child;
}

export default ChartEditorChild;
