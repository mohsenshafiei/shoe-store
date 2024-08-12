import { fixupConfigRules } from '@eslint/compat';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const commonFilePatterns = ['**/*.jsx', '**/*.tsx', '**/*.js', '**/*.ts'];

const baseConfig = {
  ignores: ['**/dist', '**/.eslintrc.cjs', '**/node_moduels'],
};

const extendedConfig = fixupConfigRules(
  compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ),
).map(config => ({
  ...config,
  files: commonFilePatterns,
}));

const reactRefreshConfig = {
  files: commonFilePatterns,
  plugins: {
    'react-refresh': reactRefresh,
  },
  languageOptions: {
    globals: {
      ...globals.browser,
    },
    parser: tsParser,
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      {
        allowConstantExport: true,
      },
    ],
  },
};

export default [baseConfig, ...extendedConfig, reactRefreshConfig];
