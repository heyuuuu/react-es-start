const webpack = require("webpack")
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
	mode: "development",
	plugins: [
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
		hot: true,
		historyApiFallback: true
	}
}