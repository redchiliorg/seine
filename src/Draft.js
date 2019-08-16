// @flow
import * as React from 'react';
import { CompositeDecorator, Editor, EditorState } from 'draft-js';
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps';
import type { DraftDecorator } from 'draft-js/lib/DraftDecorator';

import { toDraftEditor, toRawContent } from './Draft.helpers';
import { imageDecorator } from './Draft.decorators';

type Props = $Shape<$Rest<DraftEditorProps, {| editorState: * |}>> & {
  children: mixed,
  decorators?: $ReadOnlyArray<DraftDecorator>,
  verticalAlignment: 'start' | 'center' | 'end',
};

/**
 * @description Draft block component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Draft({
  children,
  onChange,
  decorators = [imageDecorator],
  verticalAlignment = 'start',
  ...editorProps
}: Props) {
  const [editorState, setEditorState] = React.useState(
    React.useMemo(
      () =>
        EditorState.set(toDraftEditor(children), {
          decorator: new CompositeDecorator(decorators),
        }),
      [children, decorators]
    )
  );

  React.useEffect(() => onChange && onChange(toRawContent(editorState)), [
    editorState,
    onChange,
  ]);

  return (
    <div style={{ display: 'flex', alignItems: verticalAlignment }}>
      <Editor
        {...editorProps}
        editorState={editorState}
        onChange={setEditorState}
      />
    </div>
  );
}
