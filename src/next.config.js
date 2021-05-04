// fuck node-sass first
(() => {
  Module = require('module')
  Module.prototype.requireOrig = Module.prototype.require
  Module.prototype.require = function (path) {
    if (path === 'node-sass') {
      return this.requireOrig('sass')
    }
    return this.requireOrig(path)
  }
})();
const path = require('path')
const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withTM = require('next-plugin-transpile-modules')
const merge = require('webpack-merge')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')


const webpack = require('webpack')

const development = process.env.NODE_ENV === 'development'
const production = process.env.NODE_ENV === 'production'
const analyze = process.env.ANALYZE === 'analyze'

const webpackConfig = {
  webpack (config, options) {
    const ret = merge(config, {
      resolve: {
        alias: {
          components: path.resolve(__dirname, './components'),
          pages: path.resolve(__dirname, './pages'),
          utils: path.resolve(__dirname, './utils'),
          static: path.resolve(__dirname, './static')
        }
      },
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif|svg)$/,
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/images/',
              outputPath: 'static/images/',
              name: '[name][hash].[ext]'
            }
          }
        ]
      }

    })
    return ret
  }
}

const sassWrapper = withSass({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    context: 'src',
    localIdentName: production ? '[hash:6]' : '[folder][name]-[local]_[sha512:hash:base64:10]',
    publicPath: '/_next/static/images/'
  },
  sassLoaderOptions: {
  },
  ...webpackConfig
})

const transpileModuleWrapper = withTM({
  transpileModules: [],
  ...sassWrapper
})
const cssWrapper = withCSS({
  ...transpileModuleWrapper,
  cssModules: false // must follow this order
})

const externalWrapper = ((nextConfig = {}) => Object.assign({}, nextConfig, {
  webpack (config, options) {
    let c = {}
    if (typeof nextConfig.webpack === 'function') {
      c = nextConfig.webpack(config, options)
    }

    c.plugins.push(new LodashModuleReplacementPlugin())
    c.plugins.push(new CopyWebpackPlugin([{
      from: 'static',
      to: path.resolve(__dirname, '.next/static')
    }]))

    if (analyze) {
      const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      c.plugins.push(new BundleAnalyzerPlugin({
        analyzerPort: options.isServer ? 8889 : 8888,
        openAnalyzer: false,
        generateStatsFile: true,
        statsFilename: `${options.isServer ? 'server' : 'client'}-stat.json`
      }))
      c.profile = true
    }

    c.module.rules.forEach(rule => {
      if (!rule.use) return
      for (let i = 0; i < rule.use.length; i++) {
        const p = rule.use[i]
        if (typeof p === 'string' && /mini-css-extract-plugin/.test(p)) {
          rule.use[i] = {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '/_next/'
            }
          }
        }
      }
    })
    console.dir(c.module.rules, { depth: 10 })

    // c.output.globalObject = `(typeof self !== 'undefined' ? self : this)`

    return c
  }
}))(cssWrapper)

module.exports = {
  ...externalWrapper,
  useFileSystemPublicRoutes: false
}
