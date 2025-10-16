import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  {
    ignores: ['dist/**', 'node_modules/**', 'cypress/**', 'backend/**', 'husky/**'],
  },

  //Базові правила ESLint
  js.configs.recommended,

  //Конфігурація для React
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Власні правила
      'react/react-in-jsx-scope': 'off',//Щоб не ругалося що не імпортується реакт в кожному файлі
      'no-unused-vars': [
        'error',
        { varsIgnorePattern: '^[A-Z_]', args: 'none' }, // ігнор невикористаних компонентів та приватних змінних
      ],
      'prefer-const': 'error',
      'no-var': 'error',
      'react-refresh/only-export-components': 'warn',
    },
  },
];
