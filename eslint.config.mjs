import antfu from '@antfu/eslint-config'
import nextPlugin from '@next/eslint-plugin-next'

export default antfu({
  type: 'app',
  typescript: true,
  react: false,
  stylistic: {
    indent: 2,
    quotes: 'single',
    semi: false,
  },
  plugins: {
    '@next/next': nextPlugin,
  },
  rules: {
    // import 排序保持警告级别
    'perfectionist/sort-exports': 'warn',
    'perfectionist/sort-imports': 'warn',
    'perfectionist/sort-named-imports': 'warn',
    // React JSX 允许同一行多个表达式
    'style/jsx-one-expression-per-line': 'off',
    'style/max-statements-per-line': 'off',
    // 花括号风格
    'style/brace-style': 'off',
    // if 换行规则过于严格
    'antfu/if-newline': 'off',
    // ESM 无需 .js 后缀
    'import/extensions': 'off',
    // tsconfig paths 别名
    'import/no-unresolved': 'off',
  },
  settings: {
    next: {
      rootDir: 'apps/landing',
    },
  },
  ignores: [
    '**/.next/**',
    '**/.vitepress/**',
    '**/dist/**',
    '**/node_modules/**',
    '**/.turbo/**',
    '**/*.config.*',
  ],
})
