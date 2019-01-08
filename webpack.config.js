/**
 * @Author: troykevin
 * @Date:   2018-12-17T11:43:04+08:00
 * @Email:  q964049459@gmail.com
 * @Last modified by:   troykevin
 * @Last modified time: 2019-01-08T13:59:36+08:00
 */
const ExtractTextPlugin     = require('extract-text-webpack-plugin');
const webpack               = require('webpack');
const HtmlWebpackPlugin     = require('html-webpack-plugin');
const path                  = require('path');
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dist';
module.exports = {
    entry : './src/app.jsx',
    output: {
        path : path.resolve(__dirname,'dist'),
        publicPath : WEBPACK_ENV === 'dev' ? '/dist/' : '//s.gitmall.cn/admin-gmall-fe/dist/',
        filename : 'js/app.js'
    },
    resolve:{
        alias : {
            page        : path.resolve(__dirname,'src/page'),
            component   : path.resolve(__dirname,'src/component'),
            util        : path.resolve(__dirname,'src/util'),
            service     : path.resolve(__dirname,'src/service')
        }
    },
    devServer: {
        port : 8087,
        historyApiFallback : {
            index : '/dist/index.html'
        },
        proxy : {
            '/manage' : {
                target: 'http://localhost:8081',
                changeOrigin : true
            },
            '/user/logout.do' : {
                target: 'http://localhost:8081',
                changeOrigin : true
            }
        }
    },
    module: {
        rules: [
            // react语法处理
            {
                test: /\.m?jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env','react']
                    }
                }
            },
            // css
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback:"style-loader",
                    use:"css-loader"
                }),
            },
            // sass
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },
            // url-loader
            {
            test: /\.(png|jpg|gif|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name : 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体
            {
            test: /\.(woff|svg|ttf|otf|woff2|eot)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name : 'resource/[name].[ext]'
                        }
                    }
                ]
            },
        ]
    },
    plugins : [
        // html的处理
        new HtmlWebpackPlugin({
            template : './src/index.html',
            favicon: './favicon.ico'
        }),
        // css独立文件
        new ExtractTextPlugin("css/[name].css"),
        // 提出公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name        : 'common',
            filename    : 'js/base.js'
        })

    ]
};
