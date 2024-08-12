// vitest.config.ts
import { configDefaults } from 'vitest/config';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      exclude: ['dist/**', 'dev-dist/**'],
    },
    include: ['**/*.{test,spec}.[jt]s?(x)'],
    exclude: [...configDefaults.exclude],
  },
});
