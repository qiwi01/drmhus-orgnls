import { defineConfig } from 'eslint/config';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';

export default defineConfig([
  {
    rules: {  // Allow impure functions for ID generation
    'react-hooks/purity': 'off',  // Allow impure functions in ID generators
  },
  },
  ...nextCoreWebVitals,
  ...nextTypeScript,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {  // Allow impure functions for ID generation
    'react-hooks/purity': 'off',  // Allow impure functions in ID generators
  },
  },
  {
    ignores: ['node_modules', '.next', 'out', 'public', 'next-env.d.ts'],
  },
]);