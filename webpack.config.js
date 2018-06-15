
const webpack = require('webpack');
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const package = require('./package.json');
const nodeExternals = require('webpack-node-externals');
const env = require('yargs').argv.env; // use --env with webpack 2

let libraryName = 'Imposium';
let plugins = [
  new webpack.BannerPlugin({banner: `// Version: ${package.version}`, raw: true, entryOnly: true})
], outputFile;

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }));
  outputFile = libraryName.toLowerCase() + '.min.js';
} else {
  outputFile = libraryName.toLowerCase() + '.js';
}

const config = {
  entry: __dirname + '/src/ImposiumClient.ts',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    loaders: [
        { test: /\.tsx?$/, loader: "awesome-typescript-loader" }
    ],
  },
  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".js", ".json"]
  },
  plugins: plugins
};

module.exports = config;