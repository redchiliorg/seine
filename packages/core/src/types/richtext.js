// @flow
import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';

export type RichTextBody = RawDraftContentState;

export type RichTextFormat = {
  textAlignment: 'left' | 'center' | 'right',
  verticalAlignment: 'start' | 'center' | 'end',
};

export const RichText = 'draft';
