const path = require("path")
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const relativeRootPath = place => path.join(__dirname,'..',place)

module.exports = {
	mode: "development",
	entry: [relativeRootPath("src/index.tsx")],
	output: {
		path: relativeRootPath('dist'),
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
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "src/index.html"
		}),
		new ESLintPlugin({
			extensions: ["tsx"]
		}),
		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		overlay: {
			warnings: true,
			errors: true
		},
		hot: true
	}
}