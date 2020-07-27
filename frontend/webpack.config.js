const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: './src/index.jsx',
    output: {
        path: __dirname + '/public',
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './public',
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            //apelido, sempre que eu me refirir ao 'node_modules', basta usar 'modules'
            modules: __dirname + '/node_modules',
            jquery: 'modules/admin-lte/plugins/jQuery/jquery-2.2.3.min.js',
            bootstrap: 'modules/admin-lte/bootstrap/js/bootstrap.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin('app.css')
    ],
    module: {
        loaders: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                preset: ['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        }, {
            teste: /\.css/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            teste: /\.woff|.woff2|.ttf|.oet|.svg|.png|.jpg*.*$/,
            loader: 'file'
        }]
    }
}

