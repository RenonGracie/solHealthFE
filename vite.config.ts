import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          sourcemapExcludeSources: true,
        },
      },
    },
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        include: '**/*.svg',
      }),
      sentryVitePlugin({
        org: env.VITE_SENTRY_ORG,
        project: env.VITE_SENTRY_PROJECT,
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
        sourcemaps: {
          assets: './dist/**',
          filesToDeleteAfterUpload: ['./dist/**/*.map'],
        },
      }),
    ],
    server: {
      proxy: {
        [env.VITE_API_URL]: {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(env.VITE_API_URL, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
