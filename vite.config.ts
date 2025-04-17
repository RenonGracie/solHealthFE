import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { sentryVitePlugin } from '@sentry/vite-plugin';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const commitHash = env.VITE_COMMIT_HASH?.slice(0, 7) || '';

  return {
    build: {
      assetsInlineLimit: 8192,
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
      ...(env.VITE_ENV
        ? [
            sentryVitePlugin({
              org: env.VITE_SENTRY_ORG,
              project: env.VITE_SENTRY_PROJECT,
              authToken: env.VITE_SENTRY_AUTH_TOKEN,
              applicationKey: env.VITE_SENTRY_PROJECT,
              release: {
                name: commitHash,
                deploy: {
                  env: env.VITE_ENV,
                },
              },
              sourcemaps: {
                assets: './dist/**',
                filesToDeleteAfterUpload: ['./dist/**/*.map'],
              },
            }) as Plugin,
          ]
        : []),
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
