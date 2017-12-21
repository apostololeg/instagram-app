const webpack = require('webpack')
const path = require('path')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'out.js?v=[hash:6]'
    },
    plugins: [
        new FaviconsWebpackPlugin('./assets/favicon.svg'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                loader: 'babel-loader',
                exclude: path.resolve(__dirname, './node_modules')
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.styl$/,
                use: [
                    { loader: 'style-loader', options: { sourceMap: false }},
                    { loader: 'css-loader', options: { sourceMap: false }},
                    {
                        loader: 'postcss-loader',
                        options: {
                            souceMap: false,
                            plugins: () => [autoprefixer]
                        }
                    },
                    { loader: 'stylus-loader', options: { sourceMap: false }},
                ],
                exclude: path.resolve(__dirname, './node_modules')
            }
        ]
    }
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
