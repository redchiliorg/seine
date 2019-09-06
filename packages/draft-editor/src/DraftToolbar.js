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
import { Button, BlockToolbarGroup, Toolbar } from '@seine/ui';
import type { Action, Block, DraftFormat, BlockId } from '@seine/core';
import { UPDATE_BLOCK_FORMAT } from '@seine/core';
import { defaultDraftFormat } from '@seine/draft';

import theme from './DraftToolbar.module.css';
import DraftEditorContext from './DraftEditorContext';
import VerticalAlignTopButton from './VerticalAlignTopButton';
import VerticalAlignCenterButton from './VerticalAlignCenterButton';
import VerticalAlignBottomButton from './VerticalAlignBottomButton';

type Props = Block & {
  format: DraftFormat,
  dispatch: (Action) => any,
  selection: BlockId[],
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
  selection,
}: Props) {
  const { editorState, setEditorState } = React.useContext(DraftEditorContext);

  const asProps = {
    as: DraftButton,

    size: 'small',
    color: 'flat',

    editorState,
    getEditorState: React.useCallback(() => editorState, [editorState]),
    setEditorState,

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
    editorState && (
      <Toolbar>
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
        <BlockToolbarGroup dispatch={dispatch} selection={selection} />
      </Toolbar>
    )
  );
}
