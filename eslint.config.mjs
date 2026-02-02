import { defineConfig, globalIgnores } from 'eslint/config';
// ESLint Config Next doesn't support Flat Config natively yet as of 15.1.
// We should import the specific JS files if they are exposed, or use a compat utility.
// Trying the suggested fix from the error message first.
// If that fails, we might need `flat-compat`.
import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const nextConfig = compat.extends("next/core-web-vitals", "next/typescript");

import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const eslintConfig = defineConfig([
  // ============================================
  // NEXT.JS CORE CONFIGURATIONS
  // ============================================
  ...nextConfig,

  // ============================================
  // PRETTIER INTEGRATION
  // ============================================
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Prettier formatting errors as ESLint errors
      'prettier/prettier': 'error',

      // TypeScript strict rules
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports',
        },
      ],

      // React best practices
      'react/self-closing-comp': 'error',
      'react/jsx-curly-brace-presence': [
        'error',
        { props: 'never', children: 'never' },
      ],

      // General code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // ============================================
  // GLOBAL IGNORES
  // ============================================
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'dist/**',
    'node_modules/**',
    'next-env.d.ts',
    '*.config.js',
    '*.config.mjs',
  ]),
]);

export default eslintConfig;
