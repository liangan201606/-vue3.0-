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
  // 这个是给webpack-dev-server开启可IP和域名访问权限。
  configureWebpack: {
    devServer: {
      // disableHostCheck: true
      allowedHosts: ['www.corho.com'] // www.corho.com=>扫码授权后的回调地址
    },
    // 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
    externals: {
      qc: 'QC'
    } 
  },
  // 需要配置10kb下的图片打包成base64的格式
  // chainWebpack: (config) => {
  //   config.module
  //     .rule('images')
  //     .use('url-loader')
  //     .loader('url-loader')
  //     .tap((options) => Object.assign(options, { limit: 10000 }))
  // }
})