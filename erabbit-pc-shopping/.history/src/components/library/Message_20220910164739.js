// 提供一个能够显示xtx-message组件的函数
// 这个函数将来： 导入直接使用 也可以挂载到vue实例上面
// import Message from 'Message.js' 使用Message({type:'error',text:'提示文字‘})
// this，$message({type:'error',text:'提示文字’})

// 封装成vue实例函数式调用
// vue3.0使用app.config.globalProperties挂载原型方法
// 也支持直接导入函数使用
export default () => {
  // 渲染组件
  // 1.导入消息提示组件
  // 2.将导入的消息提示组件
  // 3.提供一个装载消息提示组件的容器
}
