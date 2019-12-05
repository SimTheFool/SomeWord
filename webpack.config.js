const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


var configDefault =
{
    mode: 'development',
    entry: 
    {
        "index": './resources/index.js'
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
            GlobalStyle: path.resolve('./resources/global.scss')
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