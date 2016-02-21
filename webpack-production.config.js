var webpack = require('webpack');
var path = require('path');
var buildPath = path.resolve(__dirname, 'build');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var TransferWebpackPlugin = require('transfer-webpack-plugin');

var config = {
  //Entry point to the project
  entry: [
    path.join(__dirname, '/src/app/app.jsx')
  ],
  //Webpack config options on how to obtain modules
  resolve: {
    //When requiring, you don't need to add these extensions
    extensions: ["", ".js", ".jsx", ".ts", ".tsx"],
  },
  devtool: 'source-map',
  //Configuration for server
  devServer: {
    contentBase: 'build'
  },
  //Output file config
  output: {
    path: buildPath,    //Path of output file
    filename: 'app.js'  //Name of output file
  },
  plugins: [
    //Used to include index.html in build folder
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new HtmlWebpackPlugin({
        inject: false,
        template: path.join(__dirname, '/src/www/index.html')
    }),
    //Allows error warninggs but does not stop compiling. Will remove when eslint is added
    new webpack.NoErrorsPlugin(),
    //Transfer Files
    new TransferWebpackPlugin([
      {from: 'www/css', to: 'css'},
      {from: 'www/images', to: 'images'}
    ], path.resolve(__dirname,"src")), 
    
    // Fetch
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    })
  ],
  module: {
        //eslint loader
        preLoaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'eslint-loader',
        include: [path.resolve(__dirname, "src/app")],
        exclude: [nodeModulesPath]
          }
        ],
        //Allow loading of non-es5 js files.
        loaders: [
          {
            test: /\.(js|jsx)$/, //All .js and .jsx files
            loader: 'babel-loader', //babel loads jsx and es6-7
            include: [__dirname, path.resolve(__dirname, '../src')], //include these files
            exclude: [nodeModulesPath]  //exclude node_modules so that they are not all compiled
          },
      /** 
       * I can't use TypeScript because a issue
       * @see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/5128
       */
      {
        test: /\.(ts|tsx)$/, 
        loaders: ['ts-jsx-loader'],
        exclude: [nodeModulesPath]
      }
        ]
  },
  eslint: {
    configFile: '.eslintrc'
  },
};

module.exports = config;