const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


var configDefault =
{
    mode: 'development',
    entry: 
    {
        "app": './resources/index.js'
    },
    output: 
    {
        path: path.resolve('./public/'),
        filename: '[name].js'
    },
    watch: true,
    module: 
    {
        rules: [
        { 
            test: /\.(scss|css)$/, 
            use: [
            {
                loader: MiniCssExtractPlugin.loader
            },
            {
                loader: 'css-loader',
                options: {
                    url: false,
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: () => [autoprefixer()]
                }
            },
            {
                loader: 'sass-loader',
            }
            ]
        },
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use:
            {
              loader: "babel-loader",
              options: 
              {
                presets: ['@babel/preset-env', "@babel/preset-react"]
              }
            }
        }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css",
          })
    ],
    resolve:
    {
        alias:
        {
            Components: path.resolve('./resources/components'),
            Actions: path.resolve('./resources/actions'),
            Constants: path.resolve('./resources/constants'),
            Hooks: path.resolve('./resources/hooks'),
            Middlewares: path.resolve('./resources/middlewares'),
            GlobalStyle: path.resolve('./resources/global.scss'),
            Env: path.resolve('./env.json'),
            Websockets: path.resolve('./websockets')
        }
    },
    devServer:
    {
        contentBase: path.join(__dirname, 'public'),
        hot: true,
    }
};



var configModifiers = 
{
    "prod": function()
    {
        configDefault.mode = "production";
        configDefault.watch = false;
        configDefault.plugins.push(new OptimizeCssAssetsPlugin({assetNameRegExp: /\.css$/g }));
    }
};



module.exports = function(e)
{
    if(e !== null && e !== undefined)
    {
        configModifiers[e]();
    }
    return configDefault;
}