/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@internal/eslint-config/library.js"],
  parserOptions: {
    project: ["./tsconfig.json"],
  },
  ignores: ["vite.config.ts"],
  rules: {
    "import/no-extraneous-dependencies": [
      "error",
      { devDependencies: ["./__tests__/**/*.test.ts", "./vite.config.ts"] },
    ],
  },
};
