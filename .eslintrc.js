module.exports = {

    "env": {
        "es6": true,
        "browser": true,
        "node": true,
        "jquery": true
    },
    "extends"       : ["eslint:recommended", "plugin:require-extensions/recommended"],
    "ignorePatterns": ["**/node_modules/*"],
    "overrides"     : [],
    "parserOptions" : {
      "ecmaVersion": "latest",
      "sourceType" : "module",
    },
    "plugins": [
      "etc",
      "require-extensions",
      "sort-keys-fix",
      "unused-imports"
    ],
    
}