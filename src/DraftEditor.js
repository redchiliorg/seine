// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import { Editor } from 'draft-js';

import type { BlockEditor, DraftBody, DraftFormat } from './types';
import DraftEditorContext from './DraftEditorContext';
import Draft from './Draft';
import { useSelectableBlockContainerProps } from './helpers';

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
  children,
  entityMap,
  blocks,
  textAlignment,
  verticalAlignment,
  ...containerProps
}: Props) {
  const { editorState, setEditorState } = React.useContext(DraftEditorContext);

  return (
    <Container
      {...useSelectableBlockContainerProps({ id, selection }, dispatch)}
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
