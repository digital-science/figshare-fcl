import eslintConfigBase from "@digital-science/figshare-style-guide/eslint.config.js";
import tsParser from "@typescript-eslint/parser";


export default [
  ...eslintConfigBase,
  { ignores: ["build", "*.mdx", "node_modules", ".storybook/**/*.js", "packages/ui/icons/react/**"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
  },
  {
    rules: {
      "max-len": "off",
      semi: "off",
      indent: ["error", 2, { SwitchCase: 1 }],
      "prefer-arrow-callback": "off",
    },
  },
];
