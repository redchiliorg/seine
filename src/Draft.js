// @flow
import * as React from 'react';

import type { DraftData } from './types';

export default function Draft(props: { children: DraftData }) {
  return (
    <p style={{ whiteSpace: 'pre' }}>
      {JSON.stringify(props.children, null, '    ')}
    </p>
  );
}
