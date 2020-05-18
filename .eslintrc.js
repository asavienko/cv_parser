module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,
    node: true
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  parser: "babel-eslint",
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [2, { extensions: [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": 1,
    "no-unused-expressions": [
      2,
      { allowTernary: true, allowShortCircuit: true }
    ],
    "react/state-in-constructor": 0,
    "no-underscore-dangle": 0
  }
};
