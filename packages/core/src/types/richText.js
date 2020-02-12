// @flow
import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';

export type RichTextBody = RawDraftContentState;

export type TextAlignment = 'left' | 'center' | 'right';
export type VerticalAlignment = 'start' | 'center' | 'end';

export type RichTextFormat = {
  textAlignment: TextAlignment,
  verticalAlignment: VerticalAlignment,
};

export const RICH_TEXT = 'draft';
