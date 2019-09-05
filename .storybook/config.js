import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import '../packages/core/src/index.css';

const req = requireContext('../packages', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
