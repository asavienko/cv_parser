module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,
    node: true
  },
  extends: ["prettier", "plugin:react/recommended", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["prettier", "react"],
  rules: {
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx"] }]
    
  }
};
