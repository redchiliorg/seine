import React from 'react';

export const imageDecorator = {
  /** Декорировать все блоки типа IMAGE. */
  strategy(contentBlock: *, callback: *, contentState: *) {
    contentBlock.findEntityRanges((meta) => {
      const entityKey = meta.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'IMAGE'
      );
    }, callback);
  },

  /** Отображать их как img во флексбоксе. */
  component({ contentState, entityKey }) {
    const { src } = contentState.getEntity(entityKey).getData();
    return (
      <div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <img src={src} alt={entityKey} style={{ maxWidth: '75%' }} />
      </div>
    );
  },
};
