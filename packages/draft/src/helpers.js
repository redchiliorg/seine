// @flow
import { compose } from 'recompose';
import EditorState from 'draft-js/lib/EditorState';
import ContentState from 'draft-js/lib/ContentState';
import CompositeDecorator from 'draft-js/lib/CompositeDraftDecorator';
import convertFromHTML from 'draft-js/lib/convertFromHTMLToContentBlocks';
import convertFromRaw from 'draft-js/lib/convertFromRawToDraftState';
import convertToRaw from 'draft-js/lib/convertFromDraftStateToRaw';
import type { RawDraftContentState } from 'draft-js/lib/RawDraftContentState';
import type { DraftDecoratorType } from 'draft-js/lib/DraftDecoratorType';

/**
 * @description Transform a value to editor state of draft-js.
 * @param {any} value
 * @param {CompositeDecorator} decorator
 * @returns {EditorState}
 */
export function toDraftEditor(value: any, decorator?: DraftDecoratorType) {
  if (value && value instanceof EditorState) {
    return value;
  }
  return EditorState.createWithContent(toDraftContent(value), decorator);
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
    value.blocks.length &&
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
