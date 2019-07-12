import * as React from 'react';
import { storiesOf } from '@storybook/react';

import Pie from './Pie';

export const defaultPieData = {
  elements: [
    { title: 'repairs', percent: 12, color: '#653867' },
    { title: 'consulting', percent: 10, color: '#e5002d' },
    { title: 'training', percent: 8, color: '#f80048' },
    { title: 'product sales', percent: 64, color: '#ff3d69' },
    { title: 'others', percent: 6, color: '#ff6d8c' },
  ],
};

storiesOf('Pie', module).add('default', () => (
  <div style={{ width: '50%' }}>
    <Pie>{defaultPieData.elements}</Pie>
  </div>
));
