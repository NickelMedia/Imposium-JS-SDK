const package = require('./package.json');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const LIB_NAME = 'Imposium';

config = {
    entry: __dirname + '/src/entry.ts',
    devtool: 'source-map',
    target: 'node',
    node: {
        process: false
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    externals: {
        'form-data'     : 'form-data',
        'isomorphic-ws' : 'isomorphic-ws'
    },
    module: {
        rules: [{
            test    : /\.ts$/,
            use     : 'awesome-typescript-loader',
            exclude : /node_modules/
        }]
    },
    plugins: [
        new webpack.BannerPlugin({
            banner    : `// Version: ${package.version}`, 
            raw       : true, 
            entryOnly : true
        }),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ],
    optimization: {
        namedChunks: false
    },
    output: {
        library        : LIB_NAME,
        libraryTarget  : 'umd',
        umdNamedDefine : true,
        path           : __dirname + '/lib',
        globalObject   : 'this'
    }
};

module.exports = (env, argv) => {
    if (argv.mode === "production") {
        config.output.filename = `${LIB_NAME.toLowerCase()}.min.js`;
        config.plugins.push(new UglifyJSPlugin({sourceMap: true}));
    } else {
        config.output.filename = `${LIB_NAME.toLowerCase()}.js`;
    }

    return config;
};