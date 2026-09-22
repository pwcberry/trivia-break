import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import css from "@eslint/css";
import {defineConfig, globalIgnores} from "eslint/config";

export default defineConfig([
  globalIgnores(["**/dist", ".release"]),
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {js},
    extends: ["js/recommended"],
    languageOptions: {globals: globals.browser}
  },
  tseslint.configs.recommended,
  {files: ["**/*.css"], plugins: {css}, language: "css/css", extends: ["css/recommended"]},
  {
    // Server code runs on Node, not in the browser.
    files: ['server/**/*.ts', '**/*.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
]);
