import * as React from 'react';

import Content from '../Content';
import { draft, page } from '../mocks.json';

export default { title: 'Content' };

export const contentOfDraft = () => <Content parent={page}>{[draft]}</Content>;
