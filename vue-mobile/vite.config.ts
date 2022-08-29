import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default ({ mode }) =>
  defineConfig({
    plugins: [
      vue(),
      vueJsx(),
      // 按需导入
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createStyleImportPlugin({
        resolves: [ElementPlusResolve()],
        libs: [
          {
            libraryName: 'element-plus',
            esModule: true,
            resolveStyle: (name) => {
              return `element-plus/theme-chalk/${name}.css`
            }
          }
        ]
      })
      // autoprefixer({ 线上兼容 文件配置
      //   overrideBrowserslist: [
      //     'Android 4.1',
      //     'iOS 7.1',
      //     'Chrome > 31',
      //     'ff > 31',
      //     'ie >= 8',
      //     '> 1%'
      //   ],
      //   grid: true
      // })
    ],
    base: mode === 'development' ? '/' : './',
    server: {
      port: 9006
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, process.platform === 'win32' ? '\src' : '/src')
      }
    }
  })
