import XtxConfirm from './xtx-confirm.vue'
import { createVNode, render } from 'vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)

// 该函数渲染XtxConfirm组件，标题和文本
// 函数的返回值是promise对象
export default ({ type, text }) => {
  return new Promise((resolve, reject) 
}