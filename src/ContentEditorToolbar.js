// @flow
import * as React from 'react';
import styled from 'styled-components';

import { blockTypes } from './types';
import ActionButton from './ActionButton';
import Paper from './Paper';
import { toDraftContent } from './Draft.helpers';
import type { Action } from './reducers/editor';
import {
  CREATE_BLOCK,
  CREATE_BLOCKS_TREE,
  DELETE_SELECTED,
} from './reducers/editor';

type Props = {
  onChange: (Action) => any,
};

const Toolbar = styled(Paper)`
  border-radius: 2px;
  display: flex;
  background-color: darkgray;
  transition: opacity 0.15s;
  padding: 1rem 1rem calc(1rem + 5px);
`;

const ToolbarGroup = styled.div`
  padding: 0.25rem 1rem;
  display: flex;
  flex-wrap: wrap;
`;

const ToolbarLabel = styled.label`
  font-weight: 600;
  margin-right: 0.5rem;
  align-self: center;
`;

const ToolbarActionButton = styled(ActionButton)`
  color: rgb(255, 255, 255, 0.75);
  background-color: ${({ color }: { color?: 'danger' }) =>
    color === 'danger' ? 'rgb(128, 0, 0, 0.75)' : 'rgb(0, 0, 0, 0.75)'};
  border-radius: 4px;
  flex-grow: 0.25;
  padding: 0.07rem 0.5rem;
  margin: 0.25rem 0;
  :not(:last-child) {
    margin-right: 0.5rem;
  }
  :hover {
    opacity: 0.75;
  }
`;

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
      },
    },
  ],
};

/**
 * @description Toolbar of predefined content templates.
 * @param {Props} props
 * @returns {React.Node}
 */
export default function ContentEditorToolbar({
  onChange,
  hasSelected = false,
}: Props) {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarLabel>Rich text ↓</ToolbarLabel>

        <ToolbarActionButton
          title={'Add text block'}
          onChange={onChange}
          value={{
            type: CREATE_BLOCK,
            block: {
              type: blockTypes.DRAFT,
              data: {
                body: 'Rich text',
                verticalAlignment: 'center',
              },
            },
          }}
        >
          txt
        </ToolbarActionButton>

        <ToolbarActionButton
          title={'Add sibling text blocks'}
          onChange={onChange}
          value={{
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
                  },
                  {
                    type: blockTypes.DRAFT,
                    data: {
                      body: 'Second column text content',
                      verticalAlignment: 'center',
                    },
                  },
                ],
              },
            ],
          }}
        >
          txt | txt
        </ToolbarActionButton>
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarLabel>Charts ↓</ToolbarLabel>

        <ToolbarActionButton
          title={'Titled pie'}
          onChange={onChange}
          value={{
            type: CREATE_BLOCKS_TREE,
            children: [pie],
          }}
        >
          pie
        </ToolbarActionButton>

        <ToolbarActionButton
          title={'Add titled pie with description'}
          onChange={onChange}
          value={{
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
        </ToolbarActionButton>

        <ToolbarActionButton
          title={'Add description with titled pie'}
          onChange={onChange}
          value={{
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
        </ToolbarActionButton>
      </ToolbarGroup>

      {hasSelected && (
        <ToolbarGroup>
          <ToolbarLabel>Selected block</ToolbarLabel>

          <ToolbarActionButton
            color={'danger'}
            title={'Delete current selection'}
            onChange={onChange}
            value={{
              type: DELETE_SELECTED,
            }}
          >
            Delete
          </ToolbarActionButton>
        </ToolbarGroup>
      )}
    </Toolbar>
  );
}
