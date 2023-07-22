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
