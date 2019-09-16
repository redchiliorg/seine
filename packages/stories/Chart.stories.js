import * as React from 'react';
import { actions } from '@storybook/addon-actions';

import Content from '../content/src/Content';
import Editor from '../editor/src/Editor';

export default { title: '1 - Charts' };

export const PieChart = ({ actions, as: Component = Content }) => (
  <Component
    {...actions}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '63d30846-a1dc-4c50-a32a-21ca99c38bce',
        type: 'chart',
        body: {
          elements: [
            { title: 'repairs', value: 12 },
            { title: 'consulting', value: 10 },
            { title: 'training', value: 8 },
            { title: 'product sales', value: 64 },
            { title: 'others', value: 6 },
          ],
        },
        format: { kind: 'pie' },
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Component>
);
export const EditorOfPieChart = () => (
  <PieChart as={Editor} actions={actions('onChange')} />
);

export const BarChart = ({ actions, as: Component = Content }) => (
  <Component
    {...actions}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '01648d04-78ad-402b-b255-14a6066d7927',
        type: 'chart',
        body: {
          elements: [
            { title: 'WFLA', value: 20.8 },
            { title: 'Region A', value: 35.7 },
            { title: 'Region B', value: 15.8 },
            { title: 'Region C', value: 40.9 },
            { title: 'Region D', value: 23.6 },
            { title: 'Region E', value: 17.6 },
            { title: 'Region F', value: 38.1 },
            { title: 'Region G', value: 43.8 },
            { title: 'Region H', value: 16.4 },
          ],
        },
        format: { kind: 'bar' },
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Component>
);
export const EditorOfBarChart = () => (
  <BarChart as={Editor} actions={actions('onChange')} />
);

export const ColumnChart = ({ actions, as: Component = Content }) => (
  <Component
    {...actions}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: [
            { title: 'Maelstorm', value: 50.1 },
            { title: 'Spring', value: 60.33 },
            { title: 'Electro', value: 13 },
          ],
        },
        format: { kind: 'column' },
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Component>
);
export const EditorOfColumnChart = () => (
  <ColumnChart as={Editor} actions={actions('onChange')} />
);

export const ThreeGroupsOfThreeColumns = ({
  actions,
  as: Component = Content,
}) => (
  <Component
    {...actions}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: [
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Electro', value: 13, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
            { title: 'Electro', value: 14, group: 'Group 2' },

            { title: 'Maelstorm', value: 66, group: 'Group 3' },
            { title: 'Spring', value: 29, group: 'Group 3' },
            { title: 'Electro', value: 19, group: 'Group 3' },
          ],
          title: 'Column chart: 3 groups, 3 elements',
        },
        format: { kind: 'column' },
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Component>
);
export const EditorOfThreeGroupsOfThreeColumns = () => (
  <ThreeGroupsOfThreeColumns as={Editor} actions={actions('onChange')} />
);

export const ThreeGroupsOfFiveColumns = ({
  actions,
  as: Component = Content,
}) => (
  <Component
    {...actions}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: [
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Electro', value: 13, group: 'Group 1' },
            { title: 'HBO', value: 23, group: 'Group 1' },
            { title: 'Netflix', value: 33, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
            { title: 'Electro', value: 14, group: 'Group 2' },
            { title: 'HBO', value: 10.22, group: 'Group 2' },
            { title: 'Netflix', value: 14, group: 'Group 2' },

            { title: 'Maelstorm', value: 66, group: 'Group 3' },
            { title: 'Spring', value: 29, group: 'Group 3' },
            { title: 'Electro', value: 19, group: 'Group 3' },
            { title: 'HBO', value: 50, group: 'Group 3' },
            { title: 'Netflix', value: 95.45, group: 'Group 3' },
          ],
          title: 'Column chart: 3 groups of 5 elements',
        },
        format: { kind: 'column' },
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Component>
);
export const EditorOfThreeGroupsOfFiveColumns = () => (
  <ThreeGroupsOfFiveColumns as={Editor} actions={actions('onChange')} />
);

export const FourGroupsOThreeColumns = ({
  actions,
  as: Component = Content,
}) => (
  <Component
    {...actions}
    parent={{
      id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      type: 'page',
      body: null,
      format: null,
      parent_id: null,
    }}
  >
    {[
      {
        id: '78f5d055-8a9f-48cc-bead-f6c9e8451ced',
        type: 'chart',
        body: {
          elements: [
            { title: 'Maelstorm', value: 50.1, group: 'Group 1' },
            { title: 'Spring', value: 60.33, group: 'Group 1' },
            { title: 'Electro', value: 13, group: 'Group 1' },

            { title: 'Maelstorm', value: 90, group: 'Group 2' },
            { title: 'Spring', value: 100.22, group: 'Group 2' },
            { title: 'Electro', value: 14, group: 'Group 2' },

            { title: 'Maelstorm', value: 66, group: 'Group 3' },
            { title: 'Spring', value: 29, group: 'Group 3' },
            { title: 'Electro', value: 19, group: 'Group 3' },

            { title: 'Maelstorm', value: 30.1, group: 'Group 4' },
            { title: 'Spring', value: 8.33, group: 'Group 4' },
            { title: 'Electro', value: 100, group: 'Group 4' },

            { title: 'Maelstorm', value: 40, group: 'Group 5' },
            { title: 'Spring', value: 90.22, group: 'Group 5' },
            { title: 'Electro', value: 81, group: 'Group 5' },

            { title: 'Maelstorm', value: 100.13, group: 'Group 6' },
            { title: 'Spring', value: 73, group: 'Group 6' },
            { title: 'Electro', value: 34, group: 'Group 6' },
          ],
          title: 'Column chart: 4 groups of 3 elements',
        },
        format: { kind: 'column' },
        parent_id: 'bee1c449-5515-4b12-9779-cfa11f1f62d9',
      },
    ]}
  </Component>
);
export const EditorOfFourGroupsOfThreeColumns = () => (
  <FourGroupsOThreeColumns as={Editor} actions={actions('onChange')} />
);
