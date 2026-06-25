# @haskou/eslint-config

[![CI](https://github.com/haskou/eslint-config/actions/workflows/ci.yml/badge.svg)](https://github.com/haskou/eslint-config/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@haskou/eslint-config.svg)](https://www.npmjs.com/package/@haskou/eslint-config)
[![Renovate](https://img.shields.io/badge/renovate-enabled-1a1f6c.svg)](https://github.com/haskou/eslint-config/blob/main/renovate.json)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

Shared ESLint flat config for TypeScript libraries using:

- ESLint recommended rules
- TypeScript parser and plugin
- type-aware TypeScript rules through `parserOptions.projectService`
- Prettier integration
- SonarJS rules
- Perfectionist import/object sorting
- unused-imports cleanup

## Install

Using npm:

```bash
npm i -D eslint prettier typescript @haskou/eslint-config
```

Using yarn:

```bash
yarn add -D eslint prettier typescript @haskou/eslint-config
```

Using pnpm:

```bash
pnpm add -D eslint prettier typescript @haskou/eslint-config
```

The ESLint plugins and parser are dependencies of this package, so consumer projects do not need to install the whole plugin zoo manually.

## Code style

This config is opinionated. It is not just "run Prettier and avoid unused variables"; it pushes projects toward small, explicit, type-driven TypeScript.

The general vibe is close to backend/service code: clear modules, one main concept per file, explicit public/private class members, low cognitive complexity, and very little magic hidden in loose typing.

In practice, it encourages:

- strict TypeScript usage: type-aware linting is enabled through `parserOptions.projectService`, floating promises are errors, unsafe returns are errors, and unsafe calls/arguments are at least warnings
- explicit APIs: exported functions and methods need boundary types, except for known serialization-style methods like `toPrimitives`
- class structure with discipline: class members must be ordered, access modifiers are required, files should not accumulate several top-level classes/types/interfaces, and there is a maximum of one class per file
- small methods and simple control flow: complexity above `8` fails, cognitive complexity above `10` fails, nesting deeper than `3` warns, and repeated or collapsible branches are reported by SonarJS
- predictable formatting: 2 spaces, semicolons, single quotes, trailing commas, 80 character lines, and arrow parentheses are handled by Prettier
- predictable ordering: imports must be sorted, object keys are sorted with warnings, and unused imports are errors
- fewer mutation-heavy habits: parameter reassignment warns, `one-var` is forbidden, object shorthand is required, and old CommonJS `require` imports are errors

It is intentionally stricter than a casual frontend preset. The goal is code that reads like maintained application/domain code: explicit boundaries, boring diffs, short files, clear class APIs, and fewer "I'll remember this later" assumptions.

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


## Release Branches

CI publishes npm versions from pull requests merged into the default branch
according to the source branch prefix:

| Branch prefix | npm version bump |
| --- | --- |
| `fix/*` | Patch |
| `feat/*` | Minor |
| `break/*` | Major |

Other branch names run validation only and do not publish.
