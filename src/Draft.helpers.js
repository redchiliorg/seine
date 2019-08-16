// @flow
import { compose } from 'recompose';
import {
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
  EditorState,
} from 'draft-js';
import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';

/**
 * @description Transform a value to editor state of draft-js.
 * @param {any} value
 * @returns {EditorState}
 */
export function toDraftEditor(value: any) {
  if (value && value instanceof EditorState) {
    return value;
  }
  return EditorState.createWithContent(toDraftContent(value));
}

/**
 * @description Transform a value to content state of draft-js.
 * @param {any} value
 * @returns {ContentState}
 */
export function toDraftContent(value: any) {
  value = value || '';
  if (value instanceof ContentState) {
    return value;
  } else if (value instanceof EditorState) {
    return value.getCurrentContent();
  } else if (
    typeof value === 'object' &&
    Array.isArray(value.blocks) &&
    typeof value.entityMap === 'object'
  ) {
    return convertFromRaw(value);
  } else if (typeof value === 'string') {
    if (value.startsWith('<') && value.endsWith('>')) {
      const blocksFromHTML = convertFromHTML(value);
      return ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
    }
    return ContentState.createFromText(value);
  }
  return ContentState.createFromText('');
}

/**
 *  @description Transform a value to serializable content state of draft-js.
 *  @param {any} value
 *  @returns {RawDraftContentState}
 */
export const toRawContent: (value: any) => RawDraftContentState = compose(
  convertToRaw,
  toDraftContent
);
