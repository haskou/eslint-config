import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import perfectionist from 'eslint-plugin-perfectionist';
import sonarjs from 'eslint-plugin-sonarjs';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

const tsRecommendedRules = {
  ...(tsPlugin.configs['eslint-recommended']?.overrides?.[0]?.rules ?? {}),
  ...(tsPlugin.configs.recommended?.rules ?? {}),
};

const defaultIgnores = [
  'coverage/**',
  'dist/**',
  'node_modules/**',
  'build/**',
  '.turbo/**',
  '.next/**',
  '.cache/**',
  '*.min.*',
];

const typeScriptFiles = ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.cts'];
const javaScriptFiles = ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.cjs'];
const testFiles = [
  '**/*.spec.ts',
  '**/*.test.ts',
  '**/*.spec.tsx',
  '**/*.test.tsx',
  '**/__tests__/**/*.ts',
  '**/__tests__/**/*.tsx',
];

const commonGlobals = {
  ...globals.es2022,
  ...globals.node,
  ...globals.jest,
};

const plugins = {
  '@typescript-eslint': tsPlugin,
  perfectionist,
  sonarjs,
  'unused-imports': unusedImports,
};

const strictRules = {
  ...tsRecommendedRules,

  'lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true,
    },
  ],
  'padding-line-between-statements': [
    'error',
    {
      blankLine: 'always',
      prev: 'import',
      next: ['class', 'export', 'const', 'let', 'var'],
    },
    {
      blankLine: 'always',
      prev: '*',
      next: ['return', 'if'],
    },
  ],
  'no-extra-boolean-cast': 'error',
  '@typescript-eslint/no-non-null-assertion': 'off',
  '@typescript-eslint/naming-convention': [
    'error',
    {
      selector: ['variable', 'function'],
      format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
      leadingUnderscore: 'allow',
    },
    {
      selector: 'interface',
      format: ['PascalCase'],
      custom: {
        regex: '^[A-Z]',
        match: true,
      },
    },
  ],
  'no-unused-vars': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': [
    'warn',
    {
      vars: 'all',
      varsIgnorePattern: '^_',
      args: 'after-used',
      argsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/no-use-before-define': 'warn',
  '@typescript-eslint/no-inferrable-types': 'off',
  '@typescript-eslint/no-this-alias': 'warn',
  '@typescript-eslint/no-require-imports': 'error',
  '@typescript-eslint/unbound-method': 'off',
  'require-await': 'off',
  '@typescript-eslint/require-await': 'error',
  '@typescript-eslint/no-misused-promises': 'off',
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/prefer-for-of': 'error',
  '@typescript-eslint/member-delimiter-style': 'off',
  '@typescript-eslint/no-unsafe-return': 'error',
  '@typescript-eslint/no-unsafe-call': 'warn',
  '@typescript-eslint/no-unsafe-argument': 'warn',
  'max-classes-per-file': ['error', 1],
  'no-multiple-empty-lines': [
    1,
    {
      max: 1,
      maxEOF: 0,
    },
  ],
  'max-len': [
    'error',
    {
      code: 80,
      ignoreStrings: true,
      ignoreRegExpLiterals: true,
      ignoreTemplateLiterals: true,
    },
  ],
  '@typescript-eslint/explicit-member-accessibility': [
    'error',
    {
      ignoredMethodNames: ['constructor'],
      accessibility: 'explicit',
    },
  ],
  'new-parens': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-cond-assign': 'error',
  'no-console': 'warn',
  'no-debugger': 'error',
  'no-empty': 'error',
  'no-eval': 'error',
  'no-fallthrough': 'off',
  'no-invalid-this': 'off',
  'no-new-wrappers': 'error',
  'no-throw-literal': 'error',
  'no-trailing-spaces': 'error',
  'no-undef-init': 'error',
  'no-unsafe-finally': 'error',
  'no-unused-expressions': [
    'error',
    {
      allowShortCircuit: true,
    },
  ],
  'no-unused-labels': 'error',
  'object-shorthand': 'error',
  'one-var': ['error', 'never'],
  radix: 'error',
  'spaced-comment': 'error',
  'use-isnan': 'error',
  'valid-typeof': 'off',
  complexity: ['error', 8],
  '@typescript-eslint/member-ordering': [
    'error',
    {
      default: [
        'field',
        'static-field',
        'private-static-field',
        'public-static-field',
        'private-instance-field',
        'public-instance-field',
        'private-static-method',
        'public-static-method',
        'constructor',
        'private-method',
        'public-method',
      ],
    },
  ],
  'max-params': ['warn', 7],
  'max-nested-callbacks': ['warn', 2],
  'max-depth': ['warn', 3],
  'sonarjs/prefer-single-boolean-return': 'error',
  'sonarjs/no-collapsible-if': 'error',
  'sonarjs/no-duplicated-branches': 'error',
  'sonarjs/no-identical-expressions': 'warn',
  'sonarjs/no-nested-switch': 'warn',
  'perfectionist/sort-objects': [
    'warn',
    {
      type: 'natural',
      order: 'asc',
    },
  ],
  'perfectionist/sort-imports': [
    'error',
    {
      type: 'natural',
      order: 'asc',
    },
  ],
  'sonarjs/cognitive-complexity': ['error', 10],
  '@typescript-eslint/explicit-module-boundary-types': [
    'error',
    {
      allowedNames: ['toPrimitives'],
    },
  ],
  'no-param-reassign': [
    'warn',
    {
      props: true,
    },
  ],
  'no-restricted-imports': [
    'error',
    {
      paths: [
        {
          name: '../infrastructure',
          message: 'Domain layer cannot import infrastructure.',
        },
      ],
    },
  ],
  'no-restricted-syntax': [
    'warn',
    {
      selector:
        "Program > :matches(ClassDeclaration, TSInterfaceDeclaration, TSTypeAliasDeclaration, ExportNamedDeclaration[declaration.type='ClassDeclaration'], ExportNamedDeclaration[declaration.type='TSInterfaceDeclaration'], ExportNamedDeclaration[declaration.type='TSTypeAliasDeclaration']) ~ :matches(ClassDeclaration, TSInterfaceDeclaration, TSTypeAliasDeclaration, ExportNamedDeclaration[declaration.type='ClassDeclaration'], ExportNamedDeclaration[declaration.type='TSInterfaceDeclaration'], ExportNamedDeclaration[declaration.type='TSTypeAliasDeclaration'])",
      message:
        'Keep one top-level class, type, or interface per file. Move additional declarations to their own file when touching this code.',
    },
    {
      selector: "MethodDefinition[kind='constructor'] > FunctionExpression[params.length>7]",
      message:
        'Constructors with more than 7 parameters hide missing concepts. Group cohesive dependencies or split the class responsibility.',
    },
  ],
};

export function createHaskouConfig(options = {}) {
  const {
    files = typeScriptFiles,
    ignores = [],
    javascriptFiles = javaScriptFiles,
    parserOptions = {},
    testFiles: configuredTestFiles = testFiles,
    tsconfigRootDir = process.cwd(),
  } = options;

  return [
    {
      name: 'haskou/ignores',
      ignores: [...defaultIgnores, ...ignores],
    },
    js.configs.recommended,
    {
      name: 'haskou/javascript-runtime',
      files: javascriptFiles,
      languageOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        globals: commonGlobals,
      },
      rules: {
        'no-console': 'warn',
        'no-debugger': 'error',
      },
    },
    {
      name: 'haskou/typescript',
      files,
      languageOptions: {
        ecmaVersion: 2022,
        parser: tsParser,
        parserOptions: {
          projectService: true,
          sourceType: 'module',
          tsconfigRootDir,
          ...parserOptions,
        },
        sourceType: 'module',
        globals: commonGlobals,
      },
      plugins,
      rules: strictRules,
    },
    {
      name: 'haskou/tests',
      files: configuredTestFiles,
      rules: {
        '@typescript-eslint/no-unsafe-argument': 'off',
        'max-statements': 'off',
        'max-lines-per-function': 'off',
        'max-nested-callbacks': ['warn', 4],
      },
    },
    prettierRecommended,
  ];
}

export default createHaskouConfig();
