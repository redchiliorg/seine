// @flow
import { compose } from 'recompose';
import {
  EditorState,
  ContentState,
  convertFromHTML,
  convertFromRaw,
  convertToRaw,
} from 'draft-js';

export type RawContent = $Call<typeof convertToRaw, ContentState>;

/**
 * Преобразует значение в EditorState draft-js
 */
export function toDraftEditor(value: any) {
  if (value && value instanceof EditorState) {
    return value;
  }
  return EditorState.createWithContent(toDraftContent(value));
}
/**
 * Преобразует значение в ContentState draft-js
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
 *  Преобразует значение в js-примитив (объект rawContent)
 */
export const toRawContent: (any) => RawContent = compose(
  convertToRaw,
  toDraftContent
);
