import * as React from 'react';
import { actions } from '@storybook/addon-actions';

import {
  barChart,
  draft,
  page,
  pieChart,
  columnChart,
  charts,
} from '../../content/src/mocks.json';

import Editor from './Editor';

export default { title: 'Editor' };

export const editorOfEmptyContent = () => (
  <Editor {...actions('onChange')} parent={page} />
);

export const editorOfDraft = () => (
  <Editor {...actions('onChange')} parent={page}>
    {[draft]}
  </Editor>
);

export const editorOfPieChart = () => (
  <Editor {...actions('onChange')} parent={page}>
    {[pieChart]}
  </Editor>
);

export const editorOfBarChart = () => (
  <Editor {...actions('onChange')} parent={page}>
    {[barChart]}
  </Editor>
);

export const editorOfColumnChart = () => (
  <Editor {...actions('onChange')} parent={page}>
    {[columnChart]}
  </Editor>
);

export const editorOf3GroupedChart = () => (
  <Editor {...actions('onChange')} parent={page}>
    {[charts[0]]}
  </Editor>
);
