const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require("webpack-merge")

const devConfig = require("./webpack.dev.config")
const proConfig = require("./webpack.pro.config")
const Config = require("./config")

const relativeRootPath = place => path.join(__dirname,'..',place)

const { branch_env: BRANCH_ENV , mode } = process.env
const BRANCH_CONFIG = Config[BRANCH_ENV]

const baseConfig = mode === "dev" ? devConfig : proConfig

module.exports = merge({
	entry: [relativeRootPath("src/index.tsx")],
	output: {
		path: relativeRootPath(BRANCH_CONFIG.outputPath),
		publicPath: '/'
	},
	resolve: {
		extensions: [".ts",".tsx",".js"],
    alias: {
			// "src": relativeRootPath('src/')
		},
		modules: ["node_modules",relativeRootPath('/')]
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							// modules: true
						}
					}
				]
			},
			{
				test: /\.less$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							// modules: true
						}
					},
					{
						loader: "less-loader",
						options: {
							additionalData: `@tu: '${BRANCH_CONFIG.tuDomain}';`
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
		new MiniCssExtractPlugin(),
		new webpack.DefinePlugin({
			BRANCH_CONFIG: JSON.stringify(BRANCH_CONFIG),
			BRANCH_ENV: JSON.stringify(BRANCH_ENV)
		})
	]
},baseConfig)