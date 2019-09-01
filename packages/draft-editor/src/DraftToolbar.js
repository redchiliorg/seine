// @flow
import * as React from 'react';
import {
  AlignBlockCenterButton,
  AlignBlockLeftButton,
  AlignBlockRightButton,
  BoldButton,
  HeadlineOneButton,
  HeadlineThreeButton,
  HeadlineTwoButton,
  ItalicButton,
  OrderedListButton,
  UnderlineButton,
  UnorderedListButton,
} from 'draft-js-buttons';
import clsx from 'clsx';
import { Toolbar, ContentBlockToolbarGroup } from '@seine/ui';
import type { Action, Block, DraftBody, DraftFormat } from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultDraftFormat } from '@seine/draft';

import theme from './DraftToolbar.module.css';
import DraftEditorContext from './DraftEditorContext';

type Props = Block & {
  dispatch: (Action) => any,
  body: DraftBody,
  format: DraftFormat,
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
export default function DraftToolbar({
  format = defaultDraftFormat,
  dispatch,
}: Props) {
  const { editorState, setEditorState } = React.useContext(DraftEditorContext);
  const asProps = {
    as: DraftButton,
    size: 'small',
    color: 'flat',
    editorState,
    getEditorState: React.useCallback(() => editorState, [editorState]),
    setEditorState,
    alignment: format.textAlignment,
    setAlignment: React.useCallback(
      ({ alignment: textAlignment }) =>
        dispatch({
          type: UPDATE_BLOCK_FORMAT,
          format: { textAlignment },
        }),
      [dispatch]
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
