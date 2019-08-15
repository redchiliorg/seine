// @flow
import * as React from 'react';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import defaultProps from 'recompose/defaultProps';
import setDisplayName from 'recompose/setDisplayName';
import withPropsOnChange from 'recompose/withPropsOnChange';
import withStateHandlers from 'recompose/withStateHandlers';
import { Editor, EditorState, CompositeDecorator } from 'draft-js';

import { toRawContent, toDraftEditor } from './Draft.helpers';
import { imageDecorator } from './Draft.decorators';

const enhance = compose(
  defaultProps({
    children: '',
    decorators: [imageDecorator],
    editable: false,
  }),
  withPropsOnChange(['children'], ({ children, decorators }) => ({
    editorState: EditorState.set(toDraftEditor(children), {
      decorator: new CompositeDecorator(decorators),
    }),
  })),
  withStateHandlers(({ editorState }) => ({ editorState }), {
    onChange: ({ onChange }) => (editorState) => {
      onChange && onChange(toRawContent(editorState));
      return { editorState };
    },
  }),
  mapProps(({ children, decorators, editable, ...props }) => ({
    ...props,
    readOnly: !editable,
  })),
  setDisplayName('Draft')
);

/**
 * Компонент для рендеринга контента на основе RawDraftContentState.
 */
function DraftEditor(props: *) {
  const { provider: Provider, ...editor } = props;
  if (Provider) {
    return (
      <Provider value={{ editorState: editor.editorState }}>
        <Editor {...editor} />
      </Provider>
    );
  }
  return <Editor {...editor} />;
}

export default enhance(DraftEditor);
