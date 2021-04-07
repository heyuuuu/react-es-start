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
		hot: true,
		host: "0.0.0.0",
		port: 10086,
		// stats: "errors-only",
		overlay: {
			// warnings: true,
			errors: true
		},
		disableHostCheck: true,
		historyApiFallback: true,
	}
}