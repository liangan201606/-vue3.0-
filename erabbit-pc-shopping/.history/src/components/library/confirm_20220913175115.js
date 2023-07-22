import XtxConfirm from './xtx-confirm.vue'
import { createVNode, render } from 'vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

// 该函数渲染XtxConfirm组件，标题和文本
// 函数的返回值是promise对象
export default ({ type, text }) => {
  return new Promise((resolve, reject) => {
    // 1. 渲染组件
    // 2. 点击确认按钮，触发resolve同时销毁组件
    cancelCallback
    // 3. 点击取消按钮，触发reject同时销毁组件
    const vnode = createVNode(XtxConfirm, { type, text })
    render(vnode, div)
  })
}