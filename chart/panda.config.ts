import { defineConfig } from "@pandacss/dev";
import { SerendiePreset } from "@serendie/ui";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },
  outExtension: "js",
  jsxFramework: "react",
  presets: [SerendiePreset],
  // The output directory for your css system
  outdir: "styled-system",
});
