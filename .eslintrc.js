module.exports = {
  extends: ["airbnb-base", "plugin:prettier/recommended"],
  rules: {
    "spaced-comment": "off",
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false },
    ],
    "no-console": "off",
    "no-else-return": ["error", { allowElseIf: true }],
  },
};
