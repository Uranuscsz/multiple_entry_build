import { defineConfig, ConfigEnv,PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

const getAppConfigSrc=(mode) =>{
  return mode.indexOf('nested')>-1 ?'../src/nested/main.ts':'../src/main.ts'
}
const getSingleHtml=(mode: string):PluginOption =>{
  console.error(mode,'modemodemodemodemodemodemodemode');
  
  return createHtmlPlugin({
    minify: false,
    template: 'public/index.html',
    inject: {
      tags:[
        {
          tag: 'script',
          attrs: {
            src: getAppConfigSrc(mode),
            type: 'module'
          },
        },
      ]
    },
  })
}

const getAllHtml=():PluginOption =>{
    return createHtmlPlugin({
      minify: true,
      pages: [
        {
          filename: 'index.html',
          template: 'public/index.html',
          injectOptions: {
            tags: [
              {
                tag: 'script',
                attrs: {
                  src: '../src/main.ts',
                  type: 'module'
                },
              }
            ]
          },
        },
        {
          filename: 'nested.html',
          template: 'public/nested.html',
          injectOptions: {
            tags: [
              {
                tag: 'script',
                attrs: {
                  src: '../src/nested/main.ts',
                  type: 'module'
                },
              }
            ]
          },
        },
      ],
    })
}

const html = (env: ConfigEnv) => {
  const {mode} = env
  console.error(env,'envenvenv');
  
  return mode==='build'? getAllHtml():getSingleHtml(mode)
}

// https://vitejs.dev/config/
import { createHtmlPlugin } from 'vite-plugin-html'
export default defineConfig((mode) => {
  return {
    plugins: [
      vue(),
      html(mode),
    ],
  }
})
