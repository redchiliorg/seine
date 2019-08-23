// @flow
import * as React from 'react';

import { blockTypes } from './types';
import { toRawContent } from './Draft.helpers';
import type { Action } from './reducers/content';
import { CREATE_BLOCK, CREATE_BLOCKS_TREE } from './reducers/content';
import Toolbar from './ui/Toolbar';

type Props = {
  dispatch: (Action) => any,
};

const pie = {
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
        fontSize: 14,
        padding: 60,
      },
      selected: true,
    },
  ],
};

/**
 * @description Default toolbar with predefined content block layouts.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContentToolbar({ dispatch }: Props) {
  return (
    <Toolbar>
      <Toolbar.Group>
        <Toolbar.ActionButton
          title={'Add text block'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCK,
            block: {
              type: blockTypes.DRAFT,
              body: toRawContent('Rich text'),
              format: {
                verticalAlignment: 'center',
              },
              selected: true,
            },
          }}
        >
          + text
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add sibling text blocks'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCKS_TREE,
            children: [
              {
                type: blockTypes.GRID,
                body: {},
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
                    selected: true,
                  },
                  {
                    type: blockTypes.DRAFT,
                    body: toRawContent('Second column text content'),
                    format: {
                      verticalAlignment: 'center',
                    },
                    selected: true,
                  },
                ],
              },
            ],
          }}
        >
          + 2 text columns
        </Toolbar.ActionButton>
      </Toolbar.Group>

      <Toolbar.Separator />

      <Toolbar.Group>
        <Toolbar.ActionButton
          title={'Titled pie'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCKS_TREE,
            children: [pie],
          }}
        >
          + pie chart
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add titled pie with description'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCKS_TREE,
            children: [
              {
                type: blockTypes.GRID,
                format: {
                  columns: 'repeat(auto-fit, minmax(300px, 1fr))',
                },
                children: [
                  pie,
                  {
                    type: blockTypes.DRAFT,
                    body: toRawContent('Text content'),
                    format: {},
                  },
                ],
              },
            ],
          }}
        >
          + pie chart & text
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add description with titled pie'}
          dispatch={dispatch}
          action={{
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
                    body: {},
                    format: toRawContent('Text content'),
                  },
                  pie,
                ],
              },
            ],
          }}
        >
          + text & pie chart
        </Toolbar.ActionButton>
      </Toolbar.Group>
    </Toolbar>
  );
}
