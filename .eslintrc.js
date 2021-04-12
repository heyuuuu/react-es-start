module.exports = {
	parser: '@typescript-eslint/parser',
	settings: {
		react: {
			pragma: "React",
			version: "detect"
		}
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	// globals:{
	// 	"document": true,
	// 	"localStorage": true,
	// 	"window": true
	// },
	// parserOptions: {
	// 	"ecmaVersion": 7,
	// 	"sourceType": "module"
	// },
	rules: {
		"no-irregular-whitespace": 0, // 不规则的空格
		"no-useless-escape": "error", // 禁止不必要的转义使用
		"no-var": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"indent": ["error","tab"],
		// "no-multiple-empty-lines": 0,
		// "react/prop-types": [2, { ignore: ['children'] }]
	}
}