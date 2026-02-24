import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: "src/js/index.ts",
    tsconfig: "tsconfig.app.json",
    format: ["esm", "cjs"],
    dts: true,
    copy: "src/css/styles.css"
});