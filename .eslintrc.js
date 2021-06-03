module.exports = {
  root: true,
  extends: ['airbnb', 'plugin:prettier/recommended'],
  plugins: ['babel', 'prettier', 'simple-import-sort', 'react', 'react-native'],
  globals: {
    __DEV__: true,
    Promise: true,
  },
  parser: 'babel-eslint',
  rules: {
    'no-console': 'error',
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'error',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'one-var-declaration-per-line': 'off',
    'prefer-destructuring': ['off', {object: true, array: false}],
    'padding-line-between-statements': [
      'error',
      {blankLine: 'always', prev: '*', next: 'return'},
      {blankLine: 'always', prev: '*', next: 'function'},
    ],
    'spaced-comment': ['error', 'always'],
    'react/jsx-filename-extension': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
    'simple-import-sort/sort': [
      'error',
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          [`^(${require('module').builtinModules.join('|')})(/|$)`],
          // Packages. `react` related packages come first.
          ['^react', '^@?\\w'],
          // Internal packages.
          ['^(@|@monorepo)(/.*|$)'],
          // Root imports with babel-plugin-root-import (~/).
          // Parent imports. Put `..` last.
          // Other relative imports. Put same-folder imports and `.` last.
          [
            '^~/',
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
          // Side effect imports.
          ['^\\u0000'],
        ],
      },
    ],
  },
  settings: {
    react: {
      version: '16.9.0',
    },
    'import/resolver': {
      alias: {
        map: [['~', './src']],
        extensions: [
          '.js',
          '.ios.js',
          '.android.js',
          '.ts',
          '.ios.ts',
          '.android.ts',
          '.tsx',
          '.ios.tsx',
          '.android.tsx',
          '.json',
        ],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parserOptions: {
        project: 'packages/mobile/tsconfig.json',
      },
    },
  ],
};
