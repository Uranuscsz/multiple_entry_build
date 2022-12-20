import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';

let buildMode: any = '';

const getBuildInput = (mode) => {
  const main = { main: resolve(__dirname, './index.html') };
  const nested = { nested: resolve(__dirname, './nested.html') };
  if (mode === 'nested') {
    return nested;
  }
  if (mode.indexOf('nested') > -1) {
    return { ...main, ...nested };
  }
  return main;
}

const getEntryPath = (productType: string, path) => {
  const indexPath = '/src/main.ts';
  const nestedPath = '/src/nested/main.ts';
  if (productType === 'build-nested') {
    if (path === '__NESTED__') return nestedPath;
    return indexPath;
  }
  switch (productType) {
    case 'nested':
      return nestedPath;
    default:
      return indexPath;
  }
}

const transformIndexHtml = (html): string => {
  html = html.replace(/__INDEX__/, getEntryPath(buildMode, '__INDEX__'));
  html = html.replace(/__NESTED__/, getEntryPath(buildMode, '__NESTED__'));
  return html;
};

export const createTransformIndexHtml = (mode: string): PluginOption => {
  buildMode = mode;
  return {
    name: 'index-transform',
    enforce: 'pre',
    // eslint-disable-next-line consistent-return
    transform(code, id) {
      if (id.endsWith('.html')) {
        return { code: transformIndexHtml(code), map: null };
      }
    },
    transformIndexHtml,
  };
};

// https://vitejs.dev/config/
export default defineConfig(env => {
  console.error(env, 'envenvenvenvenv');
  const { mode } = env
  return {
    plugins: [vue(), createTransformIndexHtml(mode)],
    build: {
      rollupOptions: {
        input: {
          ...getBuildInput(mode),
        },
      },
      cssTarget: 'chrome61',
    },
    optimizeDeps: {
      exclude: ["__INDEX__", "__NESTED__"],
    },
  }
})
