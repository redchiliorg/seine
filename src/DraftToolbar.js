// @flow
import * as React from 'react';
import {
  BoldButton,
  ItalicButton,
  UnderlineButton,
  UnorderedListButton,
  OrderedListButton,
  HeadlineOneButton,
  HeadlineThreeButton,
  HeadlineTwoButton,
  AlignBlockCenterButton,
  AlignBlockLeftButton,
  AlignBlockRightButton,
} from 'draft-js-buttons';
import clsx from 'clsx';

import type { Action } from './reducers/content';
import type { ContentBlock, DraftBody } from './types';
import Toolbar from './ui/Toolbar';
import theme from './DraftToolbar.module.css';
import DraftEditorContext from './DraftEditorContext';
import ContentBlockToolbarGroup from './ContentBlockToolbarGroup';
import { UPDATE_BLOCK_BODY } from './reducers/content';

type Props = ContentBlock & {
  dispatch: (Action) => any,
  body: DraftBody,
};

const DraftButton = ({ as: Button, className, ...props }) => (
  <Button
    {...props}
    theme={{
      ...theme,
      button: clsx(className, theme.button),
    }}
  />
);

/**
 * @description Editor toolbar for rich text block.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function DraftToolbar({ id, body, dispatch }: Props) {
  const { editorState, setEditorState } = React.useContext(DraftEditorContext);
  const asProps = {
    as: DraftButton,
    size: 'small',
    color: 'flat',
    editorState,
    getEditorState: React.useCallback(() => editorState, [editorState]),
    setEditorState,
    alignment: body.textAlignment,
    setAlignment: React.useCallback(
      ({ alignment: textAlignment }) =>
        dispatch({
          id,
          type: UPDATE_BLOCK_BODY,
          body: { textAlignment },
        }),
      [dispatch, id]
    ),
  };

  return (
    editorState && (
      <Toolbar>
        <Toolbar.Group>
          <Toolbar.Button {...asProps} forwardedAs={BoldButton} />
          <Toolbar.Button {...asProps} forwardedAs={ItalicButton} />
          <Toolbar.Button {...asProps} forwardedAs={UnderlineButton} />
          <Toolbar.Separator />
          <Toolbar.Button {...asProps} forwardedAs={AlignBlockLeftButton} />
          <Toolbar.Button {...asProps} forwardedAs={AlignBlockCenterButton} />
          <Toolbar.Button {...asProps} forwardedAs={AlignBlockRightButton} />
          <Toolbar.Separator />
          <Toolbar.Button {...asProps} forwardedAs={HeadlineOneButton} />
          <Toolbar.Button {...asProps} forwardedAs={HeadlineTwoButton} />
          <Toolbar.Button {...asProps} forwardedAs={HeadlineThreeButton} />
          <Toolbar.Button {...asProps} forwardedAs={OrderedListButton} />
          <Toolbar.Button {...asProps} forwardedAs={UnorderedListButton} />
          <Toolbar.Separator transparent />
        </Toolbar.Group>
        <ContentBlockToolbarGroup dispatch={dispatch} />
      </Toolbar>
    )
  );
}
