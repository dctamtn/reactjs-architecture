import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

const serverImportBan = {
  regex: "(^|/)server(/|$)",
  message:
    "Browser code cannot import the server. Use apiClient to call the app API.",
};

const providerSdkBan = {
  regex: "^(ai|@ai-sdk/.+)$",
  message: "LLM SDKs belong in server/ai/providers.",
};

export default tseslint.config(
  { ignores: ["dist", "coverage", "node_modules"] },
  {
    files: ["**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.strict],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/**/*.test.ts", "src/**/*.test.tsx", "src/lib/api/**"],
    rules: {
      "no-restricted-globals": [
        "error",
        {
          name: "fetch",
          message: "Call the app API through apiClient.",
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: [serverImportBan, providerSdkBan],
        },
      ],
    },
  },
  {
    files: [
      "src/app/**/*.{ts,tsx}",
      "src/components/**/*.{ts,tsx}",
      "src/hooks/**/*.{ts,tsx}",
      "src/features/**/components/**/*.{ts,tsx}",
      "src/features/**/hooks/**/*.{ts,tsx}",
    ],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@/lib/api",
              message:
                "Components and hooks do not call the API. A feature service calls apiClient.",
            },
            {
              name: "@/lib/api/client",
              message:
                "Components and hooks do not call the API. A feature service calls apiClient.",
            },
          ],
          patterns: [serverImportBan, providerSdkBan],
        },
      ],
    },
  },
  {
    files: ["server/**/*.ts", "vite.config.ts", "config/**/*.ts"],
    languageOptions: {
      globals: globals.node,
    },
  },
);
