import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescript from "eslint-config-next/typescript";

const eslintConfig = [
  {
    ignores: [".next/**", ".source/**", "public/r/**", "node_modules/**"],
  },
  ...coreWebVitals,
  ...typescript,
  {
    // The React Compiler rules introduced in eslint-config-next 16 are highly
    // opinionated and flag intentional patterns in this component library
    // (mount guards, randomized decorative animations, demo sub-components).
    // Keep them visible as warnings rather than build-blocking errors.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/static-components": "warn",
      "react-hooks/error-boundaries": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];

export default eslintConfig;
