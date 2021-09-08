const webpack = require('webpack');
const pjson = require('./package.json');

const LIB_NAME = 'Imposium';
const BUNDLE_LOC = `${__dirname}/lib`;
const ENTRY = `${__dirname}/src/Entry.ts`;

module.exports = (env, argv) => {

    const {mode} = argv;
    const bundleExt = (mode === 'production') ? '.min.js' : '.js';

    const config = {    
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
                    use: 'ts-loader',
                    exclude: /node_modules/
                }
            ]
        },
        plugins: [
            new webpack.DefinePlugin({
                VERSION: JSON.stringify(pjson.version)
            }),
            new webpack.BannerPlugin({
                banner:`IMPOSIUM-JS-SDK | Version ${pjson.version}`
            })
        ],
        output: {
            path: BUNDLE_LOC,
            library: LIB_NAME,
            libraryTarget: 'umd',
            umdNamedDefine: true,
            filename: `${LIB_NAME.toLowerCase()}${bundleExt}`
        }
    };

    return config;
};