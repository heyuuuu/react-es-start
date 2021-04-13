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
		"no-irregular-whitespace": 0,
		"no-useless-escape": "error",
		"no-var": "error",
		"@typescript-eslint/explicit-module-boundary-types": "off",
		"indent": ["error","tab",{ "SwitchCase": 1 }],
		"quotes": ["error", "double"],
		"space-infix-ops": ["error"],
		"space-before-blocks": ["error",{"functions": "always","classes": "never"}],
		"space-before-function-paren": ["error","never"],
		"key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
		"comma-spacing": ["error", { "before": false, "after": true }]
	}
}