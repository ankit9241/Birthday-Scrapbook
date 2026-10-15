import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";

export default defineConfig(({ command }) => ({
  plugins: [
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      server: { entry: "server" },
      prerender: {
        routes: ["/"],
      },
    }),
    react(),
    ...(command === "build"
      ? [
          nitro({
            preset: "netlify",
            output: {
              dir: "dist",
              serverDir: "dist/server",
              publicDir: "dist/client",
            },
          }),
        ]
      : []),
  ],
}));
