module.exports = {
	parser: '@typescript-eslint/parser',
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	globals:{
		"document": true,
		"localStorage": true,
		"window": true
	},
	parserOptions: {
    "ecmaVersion": 7,
    "sourceType": "module"
  },
	rules: {
		"no-irregular-whitespace": 0, // 不规则的空格
		"no-useless-escape": "error", // 禁止不必要的转义使用
		"no-var": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"react/prop-types": [2, { ignore: ['children'] }]
	}
}