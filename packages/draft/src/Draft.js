// @flow
import * as React from 'react';
import styled from 'styled-components/macro';
import clsx from 'clsx';
import CompositeDecorator from 'draft-js/lib/CompositeDraftDecorator';
import type { DraftDecorator } from 'draft-js/lib/DraftDecorator';
import DraftEditorContents from 'draft-js/lib/DraftEditorContents.react';
import defaultBlockRenderMap from 'draft-js/lib/DefaultDraftBlockRenderMap';
import defaultDraftInlineStyle from 'draft-js/lib/DefaultDraftInlineStyle';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps';
import type { RichTextBody, RichTextFormat } from '@seine/core';

import { imageDecorator } from './decorators';
import { toDraftEditor } from './helpers';

export type Props = (RichTextBody & RichTextFormat) & {
  decorators?: DraftDecorator[],
  className: string,
};

export default styled(Draft)`
  display: flex;
  height: 100%;
  align-items: ${({ verticalAlignment = 'start' }: RichTextFormat) =>
    verticalAlignment};
  justify-content: ${({ textAlignment = 'left' }: RichTextFormat) =>
    textAlignment};
`;

export const defaultDraftBlocks = [];
export const defaultDraftEntityMap = {};
export const defaultDraftBody = {
  blocks: defaultDraftBlocks,
  entityMap: defaultDraftEntityMap,
};
export const defaultDraftFormat: RichTextFormat = {
  textAlignment: 'left',
  verticalAlignment: 'start',
};

/**
 * @description Draft block component.
 * @param {Props} props
 * @returns {React.Node}
 */
function Draft({
  className = '',
  decorators = [imageDecorator],
  blockRenderMap = defaultBlockRenderMap,
  blockRendererFn = () => null,
  blockStyleFn = () => '',
  keyBindingFn = getDefaultKeyBinding,
  readOnly = false,
  spellCheck = false,
  stripPastedStyles = false,
  customStyleMap = defaultDraftInlineStyle,
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
