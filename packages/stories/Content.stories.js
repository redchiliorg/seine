import * as React from 'react';
import { Content } from '@seine/content';
import { actions } from '@storybook/addon-actions';
import {
  createBlockElements,
  createTitleIdentityBlockElements,
} from '@seine/core';

export default { title: 'Multiple.Content' };

export const InitialContent = ({
  as: Container = Content,
  children = [],
  ...props
}) => (
  <Container
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
    {...actions('onChange')}
    {...props}
  >
    {children}
  </Container>
);

export const ContentOfPieAndBarSiblingCharts = (props) => (
  <InitialContent {...props}>
    {[
      {
        id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'repairs', value: 12 },
            { title: 'consulting', value: 10 },
            { title: 'training', value: 8 },
            { title: 'product sales', value: 64 },
            { title: 'others', value: 6 },
          ]),
        },
        format: { kind: 'pie' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </InitialContent>
);

export const ContentOfColumnAndBarSiblingCharts = (props) => (
  <InitialContent {...props}>
    {[
      {
        id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'Maelstorm', value: 50.1 },
            { title: 'Spring', value: 60.33 },
            { title: 'Electro', value: 13 },
          ]),
        },
        format: { kind: 'column' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
            { title: 'Region E', value: 17.6 },
            { title: 'Region F', value: 38.1 },
            { title: 'Region G', value: 43.8 },
            { title: 'Region H', value: 16.4 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </InitialContent>
);

export const ContentOfLineAndBarSiblingCharts = (props) => (
  <InitialContent {...props}>
    {[
      {
        id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927--line',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Easymode', value: 175, group: 'Year 1' },
            { title: 'Rest', value: 65, group: 'Year 1' },

            { title: 'Easymode', value: 204, group: 'Year 2' },
            { title: 'Rest', value: 68, group: 'Year 2' },

            { title: 'Easymode', value: 231, group: 'Year 3' },
            { title: 'Rest', value: 73, group: 'Year 3' },

            { title: 'Easymode', value: 237, group: 'Year 4' },
            { title: 'Rest', value: 75, group: 'Year 4' },

            { title: 'Easymode', value: 280, group: 'Year 5' },
            { title: 'Rest', value: 79, group: 'Year 5' },

            { title: 'Easymode', value: 339, group: 'Year 6' },
            { title: 'Rest', value: 90, group: 'Year 6' },
          ]),
          title: 'Sales ($ millions)',
        },
        format: {
          dy: 40,
          kind: 'line',
          maxValue: 400,
        },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
            { title: 'Region E', value: 17.6 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </InitialContent>
);

export const ContentOfColumnAndLineCharts = (props) => (
  <InitialContent {...props}>
    {[
      {
        id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'Maelstorm', value: 50.1 },
            { title: 'Spring', value: 60.33 },
            { title: 'Electro', value: 13 },
          ]),
        },
        format: { kind: 'column' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927--line',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Easymode', value: 175, group: 'Year 1' },
            { title: 'Rest', value: 65, group: 'Year 1' },

            { title: 'Easymode', value: 204, group: 'Year 2' },
            { title: 'Rest', value: 68, group: 'Year 2' },

            { title: 'Easymode', value: 231, group: 'Year 3' },
            { title: 'Rest', value: 73, group: 'Year 3' },

            { title: 'Easymode', value: 237, group: 'Year 4' },
            { title: 'Rest', value: 75, group: 'Year 4' },

            { title: 'Easymode', value: 280, group: 'Year 5' },
            { title: 'Rest', value: 79, group: 'Year 5' },

            { title: 'Easymode', value: 339, group: 'Year 6' },
            { title: 'Rest', value: 90, group: 'Year 6' },
          ]),
          title: 'Sales ($ millions)',
        },
        format: {
          dy: 40,
          kind: 'line',
          maxValue: 400,
        },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </InitialContent>
);

export const ContentOfAllCharts = (props) => (
  <InitialContent {...props}>
    {[
      {
        id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
        type: 'grid',
        body: null,
        format: null,
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927--line',
        type: 'chart',
        body: {
          elements: createTitleIdentityBlockElements([
            { title: 'Easymode', value: 175, group: 'Year 1' },
            { title: 'Rest', value: 65, group: 'Year 1' },

            { title: 'Easymode', value: 204, group: 'Year 2' },
            { title: 'Rest', value: 68, group: 'Year 2' },

            { title: 'Easymode', value: 231, group: 'Year 3' },
            { title: 'Rest', value: 73, group: 'Year 3' },

            { title: 'Easymode', value: 237, group: 'Year 4' },
            { title: 'Rest', value: 75, group: 'Year 4' },

            { title: 'Easymode', value: 280, group: 'Year 5' },
            { title: 'Rest', value: 79, group: 'Year 5' },

            { title: 'Easymode', value: 339, group: 'Year 6' },
            { title: 'Rest', value: 90, group: 'Year 6' },
          ]),
          title: 'Sales ($ millions)',
        },
        format: {
          dy: 40,
          kind: 'line',
          maxValue: 400,
        },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
            { title: 'Region E', value: 17.6 },
          ]),
        },
        format: { kind: 'bar' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'repairs', value: 12 },
            { title: 'consulting', value: 10 },
            { title: 'training', value: 8 },
            { title: 'product sales', value: 64 },
            { title: 'others', value: 6 },
          ]),
        },
        format: { kind: 'pie' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: createBlockElements([
            { title: 'Maelstorm', value: 50.1 },
            { title: 'Spring', value: 60.33 },
            { title: 'Electro', value: 13 },
          ]),
        },
        format: { kind: 'column' },
        parent_id: 'grid--bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </InitialContent>
);
