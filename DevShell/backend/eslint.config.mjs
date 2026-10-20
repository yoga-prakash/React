
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
      "*.json",
    ],
  },

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],

    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
    ],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",

      globals: {
        ...globals.node,
      },
    },

    rules: {
      // TypeScript and code correctness
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],

      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "separate-type-imports",
        },
      ],

      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-definitions": [
        "error",
        "interface",
      ],

      // Code quality
      "eqeqeq": ["error", "always"],
      "curly": ["error", "all"],
      "prefer-const": "error",
      "no-var": "error",
      "no-debugger": "error",
      "no-alert": "error",

      // Consistent formatting
      "no-multiple-empty-lines": [
        "error",
        {
          max: 1,
        },
      ],
      "eol-last": ["error", "always"],
    },
  },
]);
