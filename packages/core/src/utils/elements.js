import uuid from 'uuid/v4';

import type { BlockElement } from '../types';

const defaultBlockElementBody = {};

/**
 * @description Create an in-block element (like in chart blocks).
 * @param {?BlockElement} body
 * @returns {BlockElement}
 */
export function createBlockElement(body: ?BlockElement = null): BlockElement {
  return { ...(body || defaultBlockElementBody), id: uuid() };
}

/**
 * @description Create list of elements.
 * @param {(?BlockElement)[]} bodies
 * @returns {BlockElement[]}
 */
export function createBlockElements(bodies: (?BlockElement)[]): BlockElement[] {
  return bodies.map((body) => createBlockElement(body));
}

/**
 * @description Create list of elements where same titles mean same ids.
 * @param {(?BlockElement)[]} bodies
 * @returns {BlockElement[]}
 */
export function createTitleIdentityBlockElements(bodies: ?(BlockElement[])) {
  const titleIdentities = {};
  return bodies.map((body) => {
    if (!(body.title in titleIdentities)) {
      const element = createBlockElement(body);
      titleIdentities[body.title] = element.id;
      return element;
    }
    return { ...body, id: titleIdentities[body.title] };
  });
}
