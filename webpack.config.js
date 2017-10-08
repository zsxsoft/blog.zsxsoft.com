const webpack = require('webpack')
const path = require('path')
const browserList = [
  '>1%',
  'last 4 versions',
  'Firefox ESR',
  'not ie < 11'
]
const OfflinePlugin = require('offline-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'

const srcPath = path.join(__dirname, './src')
const buildPath = path.join(__dirname, './build')
const publicPath = path.join(__dirname, './public')

// Common plugins
const plugins = [
  new DuplicatePackageCheckerPlugin(),
  new webpack.optimize.CommonsChunkPlugin({
    name: ['libui', 'vendor'],
    minChunks: Infinity,
    filename: isProduction ? '[name].[chunkhash].js' : '[name].[hash].js'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: path.join(publicPath, 'index.html'),
    path: buildPath,
    filename: 'index.html',
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    }
  })
]

const babelPresets = [
  ['env', {
    targets: {
      browsers: browserList
    },
    modules: false,
    useBuiltIns: false,
    debug: false
  }],
  'stage-0',
  'react'
]

if (isProduction) {
  babelPresets.push('react-optimize')
}

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    query: {
      babelrc: false,
      presets: babelPresets
    }
  },
  {
    test: /\.(png|gif|jpg|svg)$/,
    include: publicPath,
    use: 'url-loader?limit=20480&name=assets/[name].[hash].[ext]'
  }
]

if (isProduction) {
  // Production plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        unused: true,
        dead_code: true
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin('style-[hash].css'),
    new OfflinePlugin({
      externals: [
        'https://blog.zsxsoft.com/favicon.ico',
        'https://static-up.zsxsoft.com/prism-151114/prism.css',
        'https://static-up.zsxsoft.com/blog/css/share.min.css',
        'https://static-up.zsxsoft.com/prism-151114/prism.js',
        'https://static-up.zsxsoft.com/useragent.js/useragent.min.js',
        'https://static-up.zsxsoft.com/blog/player-161116.js',
        'https://static-up.zsxsoft.com/blog/js/social-share.min.js',
        'https://blog.zsxsoft.com/'
      ],
      ServiceWorker: {
        publicPath: 'https://blog.zsxsoft.com/sw.js',
        minify: true
      },
      excludes: [
        '**/.*',
        '/',
        ''
      ]
    })
  )

  // Production rules
  rules.push(
    {
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: 'css-loader!sass-loader!postcss-loader'
      })
    }
  )
} else {
  // Development plugins
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin()
  )

  // Development rules
  rules.push(
    {
      test: /(\.scss|\.css)$/,
      exclude: /node_modules/,
      use: [
        'style-loader',
        // Using source maps breaks urls in the CSS loader
        // https://github.com/webpack/css-loader/issues/232
        // This comment solves it, but breaks testing from a local network
        // https://github.com/webpack/css-loader/issues/232#issuecomment-240449998
        // 'css-loader?sourceMap',
        'css-loader',
        'sass-loader?sourceMap',
        'postcss-loader'
      ]
    }
  )
}

/*
const aliases = isProduction ? {
  'react': 'react-lite',
  'react-dom': 'react-lite',
  'react-tap-event-plugin': 'react-lite/lib/react-tap-event-plugin'
} : {}
*/
const app = []
if (!isProduction) {
  app.push('react-hot-loader/patch')
}
app.push('./index.js')

module.exports = {
  devtool: !isProduction ? 'eval' : 'source-map',
  context: srcPath,
  entry: {
    vendor: [
      'react', 'react-dom', 'offline-plugin/runtime',
      'react-router-dom' // 'react-lite',
    ],
    libui: [
      'material-ui/List', 'material-ui/Drawer', 'material-ui/Divider',
      'material-ui/Card', 'material-ui/FlatButton', 'material-ui/FloatingActionButton', 'material-ui/Avatar',
      'material-ui/RaisedButton', 'material-ui/TextField', 'material-ui/RefreshIndicator',
      'material-ui/styles', 'material-ui/utils/colorManipulator',
      'material-ui/internal/TouchRipple',
      'style-it', 'chroma-js', 'dynamics.js', 'react-flip-move', 'trianglify',
      'classnames'
    ],
    js: app
  },
  output: {
    path: buildPath,
    publicPath: isProduction ? 'https://static-up.zsxsoft.com/blog/' : '/',
    filename: 'app.[chunkhash].js'
  },
  module: {
    rules
  },
  resolve: {
    // alias: aliases,
    extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      srcPath
    ]
  },
  plugins,
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: 'test.zsxsoft.com',
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m'
      }
    }
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    Buffer: false,
    crypto: false
  }
}
