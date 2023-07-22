// 提供一个能够显示xtx-message组件的函数
// 这个函数将来： 导入直接使用 也可以挂载到vue实例上面
// import Message from 'Message.js' 使用Message({type:'error',text:'提示文字‘})
// this，$message({type:'error',text:'提示文字’})

// 封装成vue实例函数式调用
// vue3.0使用app.config.globalProperties挂载原型方法
// 也支持直接导入函数使用
import XtxMessage from './xtx-message.vue'
import { createVNode, render } from 'vue'
// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-message-container')
document.body.appendChild(div)
let time = null
export default ({ type, text }) => {
  // 渲染组件
  // 1.导入消息提示组件
  // 2.将导入的消息提示组件编译为虚拟节点(dom节点)
  // createVNode(组件，属性对象(props))
  const vnode = createVNode(XtxMessage, { type, text })
  // 3.提供一个装载消息提示组件的容器
  // 4.将虚拟节点渲染到容器中 render(虚拟节点，DOM容器)
  render(vnode, div)
  // 5. 开启定时，移出DOM容器内容
}
