// @flow
import * as React from 'react';
import typeof { ContentBlock, ContentState } from 'draft-js';

export const imageDecorator = {
  /**
   * @description Decorate all IMAGE blocks.
   * @param {ContentBlock} contentBlock
   * @param {Function} callback
   * @param {ContentState} contentState
   **/
  strategy(
    contentBlock: ContentBlock,
    callback: *,
    contentState: ContentState
  ) {
    contentBlock.findEntityRanges((meta) => {
      const entityKey = meta.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    }, callback);
  },

  /**
   * @description Component for IMAGE blocks.
   * @param {{contentState: ContentState, entityKey: string}} props
   * @returns {React.Node}
   **/
  component({ contentState, entityKey }: *) {
    const { src } = contentState.getEntity(entityKey).getData();
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <img src={src} alt={entityKey} style={{ maxWidth: '75%' }} />
      </div>
    );
  },
};
