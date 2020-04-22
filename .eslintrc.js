module.exports = {
  env: {
    commonjs: true,
    browser: true,
    es6: true,
    node: true
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
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
    // "no-unused-expressions": [0]
    "no-unused-expressions": [
      2,
      { allowTernary: true, allowShortCircuit: true }
    ]
  }
};
