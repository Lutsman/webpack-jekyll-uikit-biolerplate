const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack');
// const Path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractLess = new ExtractTextPlugin({
    filename: 'styles/[name].css',
});

// const dest = Path.join(__dirname, '../dist');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new ExtractTextPlugin({filename: 'styles.css'}),
        extractLess,
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                loader: 'babel-loader',
            },
            {
                test: /\.(less|css)$/,
                use: extractLess.extract(['css-loader?sourceMap=true', 'less-loader']),
            },
        ]
    }
});
