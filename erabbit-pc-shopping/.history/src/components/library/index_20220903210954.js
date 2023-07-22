// 扩展vue原有的功能：全局组件，自定义指令，挂载原型方法，注意：没有全局过滤器。
// 这就是插件
// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue'
import XtxCarousel from './xtx-carousel.vue'
import XtxMore from './xtx-more.vue'
import defaultImg from '@/assets/images/200.png'
import XtxBread from './xtx-bread.vue'
import XtxBreadItem from './xtx-bread-item.vue'
export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    app.component(XtxSkeleton.name, XtxSkeleton)
    app.component(XtxCarousel.name, XtxCarousel)
    app.component(XtxMore.name, XtxMore)
    app.component(XtxBread.name, XtxBread)
    app.component(XtxBreadItem.name, XtxBread)
    // 当图片进入可视区域内去加载图片，且处理加载失败，封装成指令
    // 图片懒加载
    defineDirective(app)
  }
}
// 定义指令
const defineDirective = (app) => {
  // 1.图片懒加载指令 v-lazy
  // 原理：先存储图片的地址不能再src上面 当图片进入可视区 将你存储图片的地址设置给图片元素即可(操作DOM)
  app.directive('lazyload', {
    // 配置
    // vue2.0监听使用指令的DOM是否创建好 钩子函数：inserted
    // vue3.0的指令拥有的钩子函数和组件一样 使用指令的DOM是否创建好 钩子函数：mounted
    mounted(el, binding) {
      // 创建一个观察对象 来观察当前使用指令的元素
      // observer 就是观察实例
      const observer = new IntersectionObserver(
        // 信息中isIntersecting判断进入或离开
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // observe(dom) 观察哪个dom
            // unobserve(dom) 停止观察那个dom
            // 进入可视区 停止观察
            observer.unobserve(el)
            // 把指令的值设置给el的src属性 binding.value就是指令的值
            // 图片加载失败
            el.onerror = () => {
              el.src = defaultImg
            }
            el.src = binding.value
          }
        },
        {
          threshold: 0.01
        }
      )
      // 离开可视区 开始观察
      observer.observe(el)
    }
  })
}
