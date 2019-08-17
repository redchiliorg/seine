// @flow
import * as React from 'react';
import { CompositeDecorator, Editor, EditorState } from 'draft-js';
import type { DraftEditorProps } from 'draft-js/lib/DraftEditorProps';
import type { DraftDecorator } from 'draft-js/lib/DraftDecorator';

import { toDraftEditor, toRawContent } from './Draft.helpers';
import { imageDecorator } from './Draft.decorators';

type Config = $Rest<DraftEditorProps, {| editorState: EditorState |}> & {
  decorators?: DraftDecorator[],
  verticalAlignment?: 'start' | 'center' | 'end',
};

export type Props = $Shape<Config> & {
  body: any,
};

/**
 * @description Draft block component.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function Draft({
  body,
  children,
  onChange,
  decorators = [imageDecorator],
  verticalAlignment = 'start',
  readOnly = true,
  ...editorProps
}: Props) {
  const [editorState, setEditorState] = React.useState(
    React.useMemo(
      () =>
        EditorState.set(toDraftEditor(body), {
          decorator: new CompositeDecorator(decorators),
        }),
      [body, decorators]
    )
  );

  React.useEffect(() => onChange && onChange(toRawContent(editorState)), [
    editorState,
    onChange,
  ]);

  return (
    <Editor
      {...editorProps}
      readOnly={readOnly}
      editorState={editorState}
      onChange={setEditorState}
    />
  );
}
