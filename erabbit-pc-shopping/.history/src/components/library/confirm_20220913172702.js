import XtxConfirm from './xtx-confirm.vue'
import { createVNode, render } from 'vue'

// 准备dom容器
const div = document.createElement('div')
div.setAttribute('class', 'xtx-confirm-container')
document.body.appendChild(div)