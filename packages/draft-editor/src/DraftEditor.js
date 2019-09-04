// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import Editor from 'draft-js/lib/DraftEditor.react';
import type { BlockEditor, DraftBody, DraftFormat } from '@seine/core';
import { useSelectableBlockProps } from '@seine/core';
import { Draft } from '@seine/draft';

import DraftEditorContext from './DraftEditorContext';

type Props = (DraftBody & DraftFormat & BlockEditor) & {
  id: string,
  dispatch: Function,
};

const Container = styled.div`
  .DraftEditor-root {
    height: 100%;
  }
  .public-DraftEditor-content {
    display: grid;
    align-items: ${({ verticalAlignment = 'start' }) => verticalAlignment};
  }
  ${({ id, selection }: Props) =>
    selection.includes(id)
      ? css`
          border: 1px dashed blue;
        `
      : css`
          border: 1px solid transparent;
        `}
`;

/**
 * @description Draft block editor component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function DraftEditor({
  id,
  selection,
  dispatch,
  entityMap,
  blocks,
  textAlignment,
  verticalAlignment,
  ...containerProps
}: Props) {
  const { editorState, setEditorState } = React.useContext(DraftEditorContext);

  return (
    <Container
      verticalAlignment={verticalAlignment}
      {...useSelectableBlockProps({ id, selection }, dispatch)}
      {...containerProps}
    >
      {selection.length === 1 && selection[0] === id && editorState ? (
        <Editor
          textAlignment={textAlignment}
          editorState={editorState}
          onChange={setEditorState}
        />
      ) : (
        <Draft
          textAlignment={textAlignment}
          verticalAlignment={verticalAlignment}
          entityMap={entityMap}
          blocks={blocks}
        />
      )}
    </Container>
  );
}
