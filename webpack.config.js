const package = require('./package.json');

const path = require('path');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const WebpackAutoInject = require('webpack-auto-inject-version');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const LIB_NAME = 'Imposium';
const BUNDLE_LOC = `${__dirname}/lib`;
const ENTRY = `${__dirname}/src/entry.ts`;

const VERSIONING_CONF = {
    SHORT: 'IMPOSIUM-JS-SDK',
    componentsOptions: {
        InjectAsComment: {
            tag: 'Version: {version}'
        }
    }            
};

const COMPRESSION_OPTS = {
    uglifyOptions: {
        ie8: false,
        output: {
            comments: false
        }
    }
};

config = {
    mode: 'development',
    entry: ENTRY,
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'awesome-typescript-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new WebpackAutoInject(VERSIONING_CONF)
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin(COMPRESSION_OPTS)
        ]
    },
    output: {
        path: BUNDLE_LOC,
        library: LIB_NAME,
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
};

module.exports = (env, argv) => {
    const {mode} = argv;
    const bundleExt = (mode === 'production') ? '.min.js' : '.js';

    config.output.filename = `${LIB_NAME.toLowerCase()}${bundleExt}`;

    if (env === 'viz') {
        config.plugins.push(new BundleAnalyzerPlugin());
    }

    return config;
};
