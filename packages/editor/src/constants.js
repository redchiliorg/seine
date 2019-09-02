import { blockTypes, CREATE_BLOCK, CREATE_BLOCKS_TREE } from '@seine/core';
import { toRawContent } from '@seine/draft';

export const TITLED_PIE = {
  type: blockTypes.GRID,
  body: {},
  format: {
    columns: '600px',
    rows: '0.025fr 0.975fr',
  },
  children: [
    {
      type: blockTypes.DRAFT,
      body: toRawContent('<h2>Pie title</h2>'),
      format: {
        textAlignment: 'center',
      },
    },
    {
      type: blockTypes.PIE,
      body: {
        elements: [
          {
            title: 'First half',
            percent: 50,
            color: '#653867',
          },
          {
            title: 'Second half',
            percent: 50,
            color: '#e5002d',
          },
        ],
      },
      format: {
        fontSize: 14,
        padding: 60,
      },
    },
  ],
};

export const ADD_TEXT_BLOCK_ACTION = {
  type: CREATE_BLOCK,
  block: {
    type: blockTypes.DRAFT,
    body: toRawContent('Rich text'),
    format: {
      verticalAlignment: 'center',
    },
  },
};

export const ADD_SIBLING_TEXT_BLOCKS_ACTION = {
  type: CREATE_BLOCKS_TREE,
  children: [
    {
      type: blockTypes.GRID,
      body: null,
      format: {
        columns: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      children: [
        {
          type: blockTypes.DRAFT,
          body: toRawContent('First column text content'),
          format: {
            verticalAlignment: 'center',
          },
        },
        {
          type: blockTypes.DRAFT,
          body: toRawContent('Second column text content'),
          format: {
            verticalAlignment: 'center',
          },
        },
      ],
    },
  ],
};

export const ADD_TITLED_PIE_ACTION = {
  type: CREATE_BLOCKS_TREE,
  children: [TITLED_PIE],
};

export const ADD_TITLED_PIE_WITH_DESCRIPTION_ACTION = {
  type: CREATE_BLOCKS_TREE,
  children: [
    {
      type: blockTypes.GRID,
      format: {
        columns: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      children: [
        TITLED_PIE,
        {
          type: blockTypes.DRAFT,
          body: toRawContent('Text content'),
          format: null,
        },
      ],
    },
  ],
};

export const ADD_DESCRIPTION_WITH_TITLED_PIE_ACTION = {
  type: CREATE_BLOCKS_TREE,
  children: [
    {
      type: blockTypes.GRID,
      format: {
        columns: 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      children: [
        {
          type: blockTypes.DRAFT,
          body: toRawContent('Text content'),
          format: null,
        },
        TITLED_PIE,
      ],
    },
  ],
};
