module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "airbnb-base", "@vue/airbnb"],
  globals: {},
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off"
  }
};
