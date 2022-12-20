import { defineConfig, ConfigEnv,PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'

const getAppConfigSrc=(mode) =>{
  return mode.indexOf('nested')>-1 ?'../src/nested/main.ts':'../src/main.ts'
}
const getSingleHtml=(mode: string):PluginOption =>{
  return createHtmlPlugin({
    minify: false,
    template: 'public/index.html',
    inject: {
     data:{
      title: mode.indexOf('nested')>-1 ?'辅助系统':'主系统'
     },
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
      minify: false,
      pages: [
        {
          filename: 'index.html',
          template: 'public/index.html',
          injectOptions: {
            data:{
              title:'index'
            },
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
            data:{
              title:'nested'
            },
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
