import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';

import { blockTypes } from './types';
import Content from './Content';
import { toRawContent } from './Draft.helpers';
import { defaultPieData } from './Pie.stories';

const title = {
  id: 'title',
  parent_id: null,
  type: blockTypes.DRAFT,
  data: {
    textAlignment: 'center',
    body: toRawContent('<h2>V2. London income - Year 8 - 3,400,000</h2>'),
  },
};

const grid = {
  id: '1',
  parent_id: null,
  type: blockTypes.GRID,
  data: {
    alignItems: 'center',
  },
};

const pie = {
  id: 'pie',
  type: blockTypes.PIE,
  data: { ...defaultPieData, padding: 60, fontSize: 14 },
};

const draft = {
  id: 'draft',
  type: blockTypes.DRAFT,
  data: {
    body: toRawContent(
      'This block is draft.js content. Click here to edit the text.' +
        '\n\n' +
        'We are planning to add text formatting toolbar soon.' +
        '\n\n' +
        'Draft.js is a framework for building rich text editors in React,\n' +
        'powered by an immutable model and abstracting over cross-browser ' +
        'differences.'
    ),
  },
};

const component = 'main';

const knobPie = (pie) => ({
  ...pie,
  data: {
    ...pie.data,
    elements: pie.data.elements.map(
      ({ title, percent, color, ...data }, index) => ({
        ...data,
        title: text(`title #${index + 1}`, title),
        color: text(`color #${index + 1}`, color),
        percent: number(`percent #${index + 1}`, percent, {
          min: 0,
          max: 100,
        }),
      })
    ),
  },
});

storiesOf('Content', module)
  .addDecorator(withKnobs)
  .add('2-col grid: pie | draft', () => (
    <Content component={component}>
      {[
        title,
        grid,
        {
          ...knobPie(pie),
          parent_id: grid.id,
        },
        { ...draft, parent_id: grid.id },
      ]}
    </Content>
  ))
  .add('2-col grid: draft | pie', () => (
    <Content component={component}>
      {[
        grid,
        { ...draft, parent_id: grid.id },
        {
          ...knobPie(pie),
          parent_id: grid.id,
        },
      ]}
    </Content>
  ))
  .add('draft block', () => <Content component={component}>{[draft]}</Content>);
