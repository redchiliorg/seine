// @flow
import * as React from 'react';

import type { DraftData } from './types';

export default function Draft(props: { children: DraftData }) {
  return (
    <div style={{ whiteSpace: 'pre-line' }}>
      {JSON.stringify(props.children, null, ' ')}
    </div>
  );
}
