import { defineConfig } from "vite";

export default defineConfig({
   root: "./src/frontend",
   build: {
      outDir: "../../build/front",
      emptyOutDir: true,
      base: "/ideas"
   },
   server: {
      proxy: {
         "/api/v1": {
            target: "http://127.0.0.1:3000",
            secure: false,
            changeOrigin: true,
            ws: true,
            rewrite: path => path.replace(/^\/api\/v1/, "")
         }
      }
   }

});


