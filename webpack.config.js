const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');

module.exports = {
    mode: 'development',
    entry: './src/script',
    output: {
        filename: 'main.js',
        path: path.resolve( __dirname, 'dist' ),
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin ({
            template: './src/template.html',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [ 'style-loader', 'css-loader' ],
            },
            {
                test: /\.(svg)$/i,
                type: 'asset/resource',
            },
        ],
    },
}