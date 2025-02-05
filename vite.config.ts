import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@components": path.resolve(__dirname, "src/components"),
            "@api": path.resolve(__dirname, "src/api"),
            "@assets": path.resolve(__dirname, "src/assets"),
            "@types": path.resolve(__dirname, "src/utils/types.ts"),
            "@hooks": path.resolve(__dirname, "src/hooks"),
        },
    },
});
