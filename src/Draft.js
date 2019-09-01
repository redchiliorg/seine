// @flow
import * as React from 'react';
import styled from 'styled-components';
import { CompositeDecorator } from 'draft-js';
import type { DraftDecorator } from 'draft-js/lib/DraftDecorator';
import DraftEditorContents from 'draft-js/lib/DraftEditorContents.react';
import defaultBlockRenderMap from 'draft-js/lib/DefaultDraftBlockRenderMap';
import defaultDraftInlineStyle from 'draft-js/lib/DefaultDraftInlineStyle';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps';
import clsx from 'clsx';

import type { DraftBody, DraftFormat } from './types';
import { imageDecorator } from './Draft.decorators';
import { toDraftEditor } from './Draft.helpers';

export type Props = (DraftBody & DraftFormat) & {
  decorators?: DraftDecorator[],
};

export default styled(Draft)`
  display: flex;
  height: 100%;
  align-items: ${({ verticalAlignment = 'start' }: DraftFormat) =>
    verticalAlignment};
  justify-content: ${({ textAlignment = 'left' }: DraftFormat) =>
    textAlignment};
`;

export const defaultDraftBlocks = [];
export const defaultDraftEntityMap = {};
export const defaultDraftBody = {
  blocks: defaultDraftBlocks,
  entityMap: defaultDraftEntityMap,
};
export const defaultDraftFormat: DraftFormat = {
  textAlignment: 'left',
  verticalAlignment: 'top',
};

/**
 * @description Draft block component.
 * @param {Props} props
 * @returns {React.Node}
 */
function Draft({
  children,
  decorators = [imageDecorator],
  blockRenderMap = defaultBlockRenderMap,
  blockRendererFn = () => null,
  blockStyleFn = () => '',
  keyBindingFn = getDefaultKeyBinding,
  readOnly = false,
  spellCheck = false,
  stripPastedStyles = false,
  customStyleMap = defaultDraftInlineStyle,
  className = '',
  textAlignment = 'left',
  blocks = defaultDraftBlocks,
  entityMap = defaultDraftEntityMap,
  ...editorProps
}: Props & DraftEditorProps) {
  return (
    <div
      className={clsx({
        [className]: true,
        'DraftEditor/root': true,
        'DraftEditor/alignLeft': textAlignment === 'left',
        'DraftEditor/alignRight': textAlignment === 'right',
        'DraftEditor/alignCenter': textAlignment === 'center',
      })}
    >
      <DraftEditorContents
        {...editorProps}
        blockRenderMap={blockRenderMap}
        blockRendererFn={blockRendererFn}
        blockStyleFn={(block) => clsx(blockStyleFn(block), className)}
        keyBindingFn={keyBindingFn}
        readOnly={readOnly}
        spellChek={spellCheck}
        stripPastedStyles={stripPastedStyles}
        customStyleMap={customStyleMap}
        editorState={React.useMemo(
          () =>
            toDraftEditor(
              { blocks, entityMap },
              new CompositeDecorator(decorators)
            ),
          [blocks, decorators, entityMap]
        )}
      />
    </div>
  );
}
