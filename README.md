# @haskou/eslint-config

Shared ESLint flat config for TypeScript libraries using:

- ESLint recommended rules
- TypeScript parser and plugin
- type-aware TypeScript rules through `parserOptions.projectService`
- Prettier integration
- SonarJS rules
- Perfectionist import/object sorting
- unused-imports cleanup

## Install

```bash
npm i -D eslint prettier typescript @haskou/eslint-config
```

The ESLint plugins and parser are dependencies of this package, so consumer projects do not need to install the whole plugin zoo manually.

## ESLint usage

Create `eslint.config.mjs` in the consumer project:

```js
import haskou from '@haskou/eslint-config';

export default haskou;
```

Then add scripts:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Custom usage

```js
import { createHaskouConfig } from '@haskou/eslint-config';

export default createHaskouConfig({
  ignores: ['generated/**'],
});
```

Available options:

```ts
type HaskouConfigOptions = {
  files?: string[];
  ignores?: string[];
  javascriptFiles?: string[];
  parserOptions?: Record<string, unknown>;
  testFiles?: string[];
  tsconfigRootDir?: string;
};
```

## Prettier usage

Create `prettier.config.mjs` in the consumer project:

```js
import prettierConfig from '@haskou/eslint-config/prettier';

export default prettierConfig;
```
