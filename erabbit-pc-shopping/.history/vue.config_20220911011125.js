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
  chainWebpack: config => {
    config.devServer.disableHostCheck(true)
  },
  devServer: {
    host: '127.0.0.1',
    disableHostCheck: true, //如果报错  Invalid Host header  设置这个跳过检查host
  }
    
  // 这个是设置外部扩展，模块为qc变量名为QC，导入qc将不做打包。
  configureWebpack: {
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


// const path = require('path')
// module.exports = {
//   pluginOptions: {
//     'style-resources-loader': {
//       preProcessor: 'less',
//       // 哪些文件自动引入，使用绝对路径
//       // 需要是path.join来拼接完整路径
//       patterns: [
//         path.join(__dirname, './src/assets/styles/variables.less'),
//         path.join(__dirname, './src/assets/styles/mixins.less')
//       ]
//     }
//   },
//   chainWebpack: config => {
//     // 图片加载
//     config.module
//       .rule('images')
//       .use('url-loader')
//       .loader('url-loader')
//       .tap(options => Object.assign(options, { limit: 10000 }))

//     // 开启IP域名访问
//     config.devServer.disableHostCheck(true)
//   },
//   configureWebpack: {
//     externals: {
//       qc: 'QC'
//     }
//   }
// }

