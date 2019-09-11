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
import { typeof BlockToolbarGroup, Button, Toolbar } from '@seine/ui';
import type { Action, Block, BlockId, DraftFormat } from '@seine/core';
import { UPDATE_BLOCK_EDITOR, UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultDraftFormat } from '@seine/draft';

import theme from './DraftToolbar.module.css';
import VerticalAlignTopButton from './VerticalAlignTopButton';
import VerticalAlignCenterButton from './VerticalAlignCenterButton';
import VerticalAlignBottomButton from './VerticalAlignBottomButton';
import { defaultDraftEditor } from './DraftEditor';

type Props = Block & {
  format: DraftFormat,
  editor: { state: * },
  dispatch: (Action) => any,
  selection: BlockId[],
  children: React.Element<typeof BlockToolbarGroup>,
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
  editor: {
    state: editorState = defaultDraftEditor.state,
  } = defaultDraftEditor,
  dispatch,
  children,
}: Props) {
  const asProps = {
    as: DraftButton,

    size: 'small',
    color: 'flat',

    editorState,
    getEditorState: React.useCallback(() => editorState, [editorState]),
    setEditorState: React.useCallback(
      (state) =>
        dispatch({
          type: UPDATE_BLOCK_EDITOR,
          editor: { state },
        }),
      [dispatch]
    ),
    alignment:
      (format && format.textAlignment) || defaultDraftFormat.textAlignment,
    setAlignment: React.useCallback(
      ({ alignment: textAlignment }) =>
        dispatch({
          type: UPDATE_BLOCK_FORMAT,
          format: { textAlignment },
        }),
      [dispatch]
    ),
  };

  const verticalAlignmentAsProps = {
    ...asProps,

    alignment:
      (format && format.verticalAlignment) ||
      defaultDraftFormat.verticalAlignment,
    setAlignment: React.useCallback(
      ({ alignment }) =>
        dispatch({
          type: UPDATE_BLOCK_FORMAT,
          format: { verticalAlignment: alignment },
        }),
      [dispatch]
    ),
  };

  return (
    <Toolbar>
      {editorState && (
        <Toolbar.Group>
          <Button {...asProps} forwardedAs={BoldButton} />
          <Button {...asProps} forwardedAs={ItalicButton} />
          <Button {...asProps} forwardedAs={UnderlineButton} />
          <Toolbar.Separator />
          <Button {...asProps} forwardedAs={AlignBlockLeftButton} />
          <Button {...asProps} forwardedAs={AlignBlockCenterButton} />
          <Button {...asProps} forwardedAs={AlignBlockRightButton} />
          <Toolbar.Separator />
          <Button
            {...verticalAlignmentAsProps}
            forwardedAs={VerticalAlignTopButton}
          />
          <Button
            {...verticalAlignmentAsProps}
            forwardedAs={VerticalAlignCenterButton}
          />
          <Button
            {...verticalAlignmentAsProps}
            forwardedAs={VerticalAlignBottomButton}
          />
          <Toolbar.Separator />
          <Button {...asProps} forwardedAs={HeadlineOneButton} />
          <Button {...asProps} forwardedAs={HeadlineTwoButton} />
          <Button {...asProps} forwardedAs={HeadlineThreeButton} />
          <Button {...asProps} forwardedAs={OrderedListButton} />
          <Button {...asProps} forwardedAs={UnorderedListButton} />
          <Toolbar.Separator transparent />
        </Toolbar.Group>
      )}
      {children}
    </Toolbar>
  );
}
