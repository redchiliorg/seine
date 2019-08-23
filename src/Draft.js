// @flow
import * as React from 'react';
import styled from 'styled-components';
import { CompositeDecorator, EditorState } from 'draft-js';
import type { DraftDecorator } from 'draft-js/lib/DraftDecorator';
import DraftEditorContents from 'draft-js/lib/DraftEditorContents.react';
import defaultBlockRenderMap from 'draft-js/lib/DefaultDraftBlockRenderMap';
import defaultDraftInlineStyle from 'draft-js/lib/DefaultDraftInlineStyle';
import getDefaultKeyBinding from 'draft-js/lib/getDefaultKeyBinding';
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps';
import clsx from 'clsx';

import { imageDecorator } from './Draft.decorators';
import type { DraftBody, DraftFormat } from './types';
import { toDraftEditor } from './Draft.helpers';

export type Props = DraftEditorProps &
  DraftBody &
  DraftFormat & {
    decorators?: DraftDecorator[],
  };

export default styled(Draft)`
  display: flex;
  height: 100%;
  align-items: ${({ verticalAlignment = 'start' }) => verticalAlignment};
  justify-content: ${({ textAlignment = 'left' }: Props) => textAlignment};
`;

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
  blocks = [],
  entityMap = {},
  ...editorProps
}: Props) {
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
            EditorState.set(toDraftEditor({ blocks, entityMap }), {
              decorator: new CompositeDecorator(decorators),
            }),
          [blocks, decorators, entityMap]
        )}
      />
    </div>
  );
}
