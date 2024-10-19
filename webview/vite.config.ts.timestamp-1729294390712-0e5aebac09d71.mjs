// vite.config.ts
import { defineConfig } from "file:///D:/github/rebar-altv/node_modules/.pnpm/vite@5.4.3_@types+node@20.16.4/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/github/rebar-altv/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.3_@types+node@20.16.4__vue@3.5.1_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname = "D:\\github\\rebar-altv\\webview";
var vite_config_default = defineConfig({
  base: "./",
  build: {
    outDir: "../resources/webview",
    emptyOutDir: true,
    minify: "esbuild",
    reportCompressedSize: false
  },
  resolve: {
    alias: {
      "@Client": path.resolve(__vite_injected_original_dirname, "../src/main/client"),
      "@Server": path.resolve(__vite_injected_original_dirname, "../src/main/server"),
      "@Shared": path.resolve(__vite_injected_original_dirname, "../src/main/shared"),
      "@Plugins": path.resolve(__vite_injected_original_dirname, "../src/plugins"),
      "@Composables": path.resolve(__vite_injected_original_dirname, "./composables"),
      "@Components": path.resolve(__vite_injected_original_dirname, "./components")
    }
  },
  plugins: [vue()]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxccmViYXItYWx0dlxcXFx3ZWJ2aWV3XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxnaXRodWJcXFxccmViYXItYWx0dlxcXFx3ZWJ2aWV3XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9naXRodWIvcmViYXItYWx0di93ZWJ2aWV3L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gICAgYmFzZTogJy4vJyxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgb3V0RGlyOiAnLi4vcmVzb3VyY2VzL3dlYnZpZXcnLFxyXG4gICAgICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxyXG4gICAgICAgIG1pbmlmeTogJ2VzYnVpbGQnLFxyXG4gICAgICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcclxuICAgIH0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgICAgYWxpYXM6IHtcclxuICAgICAgICAgICAgJ0BDbGllbnQnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi4vc3JjL21haW4vY2xpZW50JyksXHJcbiAgICAgICAgICAgICdAU2VydmVyJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYy9tYWluL3NlcnZlcicpLFxyXG4gICAgICAgICAgICAnQFNoYXJlZCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuLi9zcmMvbWFpbi9zaGFyZWQnKSxcclxuICAgICAgICAgICAgJ0BQbHVnaW5zJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4uL3NyYy9wbHVnaW5zJyksXHJcbiAgICAgICAgICAgICdAQ29tcG9zYWJsZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9jb21wb3NhYmxlcycpLFxyXG4gICAgICAgICAgICAnQENvbXBvbmVudHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9jb21wb25lbnRzJyksXHJcbiAgICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbdnVlKCldLFxyXG59KTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4USxTQUFTLG9CQUFvQjtBQUMzUyxPQUFPLFNBQVM7QUFDaEIsT0FBTyxVQUFVO0FBRmpCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQ3hCLE1BQU07QUFBQSxFQUNOLE9BQU87QUFBQSxJQUNILFFBQVE7QUFBQSxJQUNSLGFBQWE7QUFBQSxJQUNiLFFBQVE7QUFBQSxJQUNSLHNCQUFzQjtBQUFBLEVBQzFCO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDTCxPQUFPO0FBQUEsTUFDSCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxNQUN2RCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxNQUN2RCxXQUFXLEtBQUssUUFBUSxrQ0FBVyxvQkFBb0I7QUFBQSxNQUN2RCxZQUFZLEtBQUssUUFBUSxrQ0FBVyxnQkFBZ0I7QUFBQSxNQUNwRCxnQkFBZ0IsS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxNQUN2RCxlQUFlLEtBQUssUUFBUSxrQ0FBVyxjQUFjO0FBQUEsSUFDekQ7QUFBQSxFQUNKO0FBQUEsRUFDQSxTQUFTLENBQUMsSUFBSSxDQUFDO0FBQ25CLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
