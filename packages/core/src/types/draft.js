// @flow

import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';

export type DraftBody = RawDraftContentState;

export type DraftFormat = {
  textAlignment: 'left' | 'center' | 'right',
  verticalAlignment: 'start' | 'center' | 'end',
};

export const DRAFT = 'draft';
