const package = require('./package.json');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const LIB_NAME = 'Imposium';

config = {
    entry: __dirname + '/src/ImposiumClient.ts',
    devtool: 'source-map',
    module: {
        rules: [{
            test    : /\.ts$/,
            use     : 'awesome-typescript-loader',
            exclude : /node_modules/
        }]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        library        : LIB_NAME,
        libraryTarget  : 'umd',
        umdNamedDefine : true,
        path           : __dirname + '/lib',
        globalObject   : 'this'
    },
    plugins: [
        new webpack.BannerPlugin({
            banner    : `// Version: ${package.version}`, 
            raw       : true, 
            entryOnly : true
        })
    ],
    externals: {
        'form-data'     : 'form-data',
        'isomorphic-ws' : 'isomorphic-ws'
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