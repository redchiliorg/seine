// @flow
import * as React from 'react';

import { blockTypes } from './types';
import { toDraftContent } from './Draft.helpers';
import type { Action } from './reducers/content';
import { CREATE_BLOCK, CREATE_BLOCKS_TREE } from './reducers/content';
import Toolbar from './ui/Toolbar';

type Props = {
  dispatch: (Action) => any,
};

const pie = {
  type: blockTypes.GRID,
  data: {
    columns: '600px',
    rows: '0.025fr 0.975fr',
  },
  children: [
    {
      type: blockTypes.DRAFT,
      data: {
        body: toDraftContent('<h2>Pie title</h2>'),
        textAlignment: 'center',
      },
    },
    {
      type: blockTypes.PIE,
      data: {
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
export default function ContentActions({ dispatch }: Props) {
  return (
    <>
      <Toolbar.Group>
        <Toolbar.Label>Rich text ↓</Toolbar.Label>

        <Toolbar.ActionButton
          title={'Add text block'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCK,
            block: {
              type: blockTypes.DRAFT,
              data: {
                body: 'Rich text',
                verticalAlignment: 'center',
              },
              selected: true,
            },
          }}
        >
          txt
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add sibling text blocks'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCKS_TREE,
            children: [
              {
                type: blockTypes.GRID,
                data: { columns: 'repeat(auto-fit, minmax(300px, 1fr))' },
                children: [
                  {
                    type: blockTypes.DRAFT,
                    data: {
                      body: 'First column text content',
                      verticalAlignment: 'center',
                    },
                    selected: true,
                  },
                  {
                    type: blockTypes.DRAFT,
                    data: {
                      body: 'Second column text content',
                      verticalAlignment: 'center',
                    },
                    selected: true,
                  },
                ],
              },
            ],
          }}
        >
          txt | txt
        </Toolbar.ActionButton>
      </Toolbar.Group>

      <Toolbar.Group>
        <Toolbar.Label>Charts ↓</Toolbar.Label>

        <Toolbar.ActionButton
          title={'Titled pie'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCKS_TREE,
            children: [pie],
          }}
        >
          pie
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add titled pie with description'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCKS_TREE,
            children: [
              {
                type: blockTypes.GRID,
                data: { columns: 'repeat(auto-fit, minmax(300px, 1fr))' },
                children: [
                  pie,
                  {
                    type: blockTypes.DRAFT,
                    data: { body: 'Text content' },
                  },
                ],
              },
            ],
          }}
        >
          pie | txt
        </Toolbar.ActionButton>

        <Toolbar.ActionButton
          title={'Add description with titled pie'}
          dispatch={dispatch}
          action={{
            type: CREATE_BLOCKS_TREE,
            children: [
              {
                type: blockTypes.GRID,
                data: { columns: 'repeat(auto-fit, minmax(300px, 1fr))' },
                children: [
                  {
                    type: blockTypes.DRAFT,
                    data: { body: 'Text content' },
                  },
                  pie,
                ],
              },
            ],
          }}
        >
          txt | pie
        </Toolbar.ActionButton>
      </Toolbar.Group>
    </>
  );
}
