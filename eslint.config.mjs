import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "docs/**",
    "build/**",
    "next-env.d.ts",
    // sites/ is the folded Vinext site with its own oxlint gate.
    "sites/**",
  ]),
]);

export default eslintConfig;
