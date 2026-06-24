import { createHaskouConfig } from '@haskou/eslint-config';

export default createHaskouConfig({
  ignores: ['generated/**'],
  parserOptions: {
    projectService: true,
  },
});
