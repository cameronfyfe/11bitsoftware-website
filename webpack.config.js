const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const path = require('path')
const sveltePreprocess = require('svelte-preprocess')

const mode = process.env.NODE_ENV || 'development'
const prod = mode === 'production'

let plugins = []
plugins.push(
  new HtmlWebpackPlugin({
    inject: true,
    template: path.resolve('src/index.html'),
    favicon: 'src/favicon.png',
  })
)
// plugins.push(new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/bundle/]))
plugins.push(
  new MiniCssExtractPlugin({
    filename: '[name].css',
  })
)
if (process.env.BUNDLE_ANALYZER === 'yes')
  plugins.push(new BundleAnalyzerPlugin())

module.exports = {
  entry: {
    bundle: ['./src/main.ts'],
  },
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.ts', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  output: {
    path: path.join(__dirname, '/build'),
    filename: '[name].js',
    chunkFilename: '[name].[id].js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            compilerOptions: {
              dev: !prod,
            },
            emitCss: prod,
            hotReload: !prod,
            preprocess: sveltePreprocess({ sourceMap: !prod }),
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: "style-loader",
          //   options: { injectType: "singletonStyleTag" },
          // },
          'css-loader',
        ],
      },
      {
        // required to prevent errors from Svelte on Webpack 5+
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  mode,
  plugins,
  devtool: prod ? false : 'source-map',
  devServer: {
    hot: true,
    port: 3000,
  },
}
