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
  devServer: {
    host: '128.0.0.1',
   port: 8080,
   client: {
     webSocketURL: 'ws://192.168.0.103:8080/ws',
   },
    headers: {
     'Access-Control-Allow-Origin': '*',
  }
},
————————————————
版权声明：本文为CSDN博主「潮汐未见潮落」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/qq_52855464/article/details/125694926
})
