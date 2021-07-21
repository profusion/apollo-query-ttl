module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'prettier',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import'],
  rules: {
    'import/no-extraneous-dependencies': [
      'error',
      { devDependencies: ['examples/*.*', 'lib/*.test.ts'] },
    ],
    'import/extensions': ['error', 'never'],
    '@typescript-eslint/consistent-type-assertions': [
      'error',
      {
        assertionStyle: 'as',
        objectLiteralTypeAssertions: 'allow-as-parameter',
      },
    ],
    '@typescript-eslint/explicit-function-return-type': 'error',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/ban-types': [
      'off',
      {
        types: {
          '{}': false,
          object: false,
        },
      },
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    'func-names': [2, 'never'],
    'func-style': [
      2,
      'expression',
      {
        allowArrowFunctions: true,
      },
    ],
    'global-require': 0,
    'import/no-cycle': 'error',
    'import/no-unresolved': 'error',
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['sibling', 'parent', 'internal', 'index'],
        ],
        'newlines-between': 'always-and-inside-groups',
      },
    ],
    'max-classes-per-file': 0,
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../../*'],
      },
    ],
    'sort-keys': 'error',
    strict: [0, 'global'],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
