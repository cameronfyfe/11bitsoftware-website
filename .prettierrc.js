module.exports = {
  trailingComma: 'es5',
  tabWidth: 4,
  printWidth: 80,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  svelteSortOrder: 'options-scripts-markup-styles',
  svelteStrictMode: false,
  svelteAllowShorthand: true,
  svelteIndentScriptAndStyle: true,
  overrides: [
    {
      files: ['*.js', '*.ts', '*.svelte', '*.json'],
      options: {
        tabWidth: 2,
      },
    },
  ],
}
