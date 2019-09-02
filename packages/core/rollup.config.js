import config from '../../rollup.config';

export default {
  ...config,
  external: [...config.external, 'crypto'],
};
