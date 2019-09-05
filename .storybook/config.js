import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import './index.css';

const req = requireContext('../packages', true, /\.stories.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
