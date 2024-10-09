import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { 
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "module" // Endre fra 'commonjs' til 'module'
    } 
  },
  {
    languageOptions: { 
      globals: globals.browser // For nettlesermiljøet
    }
  },
  pluginJs.configs.recommended,
];
