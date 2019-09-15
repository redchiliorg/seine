import { addParameters, configure } from '@storybook/react';
import requireContext from 'require-context.macro';
import './index.css';

addParameters({ options: { makeDisplayName: (key) => `close to ${key}` } });

configure(requireContext('../packages', true, /\.stories.js$/), module);
