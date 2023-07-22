const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 引入文件需要使用绝对路径
      patterns: [path.join(__dirname, './src/assets/styles/variables.less'), path.join(__dirname, './src/assets/styles/mixins.less')]
    }
  },
  // 需要配置10kb下的图片打包成base64的格式
  chainWebpack: (config) => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 10000 }))
  }
  // devServer: {
  //   host: '128.0.0.1',
  //   port: 8080,
  //   client: {
  //     webSocketURL: 'ws://192.168.1.2:8080/ws',
  //   },
  //     headers: {
  //     'Access-Control-Allow-Origin': '*',
  //   }
  // },
})
