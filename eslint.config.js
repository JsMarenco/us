import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";
import unUsedImports from "eslint-plugin-unused-imports";
import airbnbBase from "eslint-config-airbnb-base";
import airbnbTypescript from "eslint-config-airbnb-typescript";
import reactPlugin from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default defineConfig([
  js.configs.recommended,
  eslintPluginPrettierRecommended,

  ...eslintPluginAstro.configs["flat/all"],
  ...eslintPluginAstro.configs["flat/jsx-a11y-recommended"],

  {
    files: ["**/*.{mjs,cjs,ts,tsx,mts,cts}"],

    extends: ["js/recommended"],
    rules: {
      ...airbnbBase.rules,
      ...airbnbTypescript.rules,
      ...eslintConfigPrettier.rules,
      quotes: ["error", "double"],
      "no-console": "warn",
      "no-unused-vars": "off",
      "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
      ],
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
    plugins: {
      js,
      "@typescript-eslint": tseslint,
      "unused-imports": unUsedImports,
      react: reactPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      },
    },
    languageOptions: {
      parser: tsParser,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]);
