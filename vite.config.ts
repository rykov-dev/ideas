import { defineConfig } from "vite";
import config from "config";
const apiUrl = config.get("API_URL");
console.log(apiUrl);

export default defineConfig({
   root: "./src/frontend",
   base: "/ideas/",
   define: {
      API_URL: `"${apiUrl}"`
   },
   build: {
      outDir: "../../build/front",
      emptyOutDir: true,
   },
   server: {
      proxy: {
         "/api/v1": {
            target: "http://127.0.0.1:3000",
            secure: false,
            changeOrigin: true,
            ws: true,
         }
      }
   }

});


