// 提供复用逻辑的函数（钩子）
// 数据懒加载
import { useIntersectionObserver, useIntervalFn } from '@vueuse/core'
import { ref, onUnmounted } from 'vue'
import dayjs from 'dayjs'
// target表示DOM对象
// apiFn表示api函数
export const useLazyData = (apiFn) => {
  const result = ref([])
  // 监听的目标元素
  const target = ref(null)
  // stop停止观察
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], ObjectElement) => {
      // isIntersecting是否进入可视区
      if (isIntersecting) {
        stop()
        // 调用API函数获取数据
        apiFn().then((data) => {
          result.value = data.result
        })
      }
    },
    {
      // 配置选项
      // 产品区域需要滚动比较多才能去加载数据
      // threshold 容器和可视区交叉的占比（进入的面积/容器完整面试） 取值，0-1 之间，默认比0大，所以需要滚动较多才能触发进入可视区域事件
      threshold: 0 // 只要相交就一定触发
    }
  )
  return { result, target }
}
// 支付倒计时函数
export const usePayTime = () => {
  // 倒计时逻辑
  const time = ref(0)
  const timeText = ref('')
  const { pause, resume } = useIntervalFn(
    () => {
      time.value--
      timeText.value = dayjs.unix(time.value).format('mm分ss秒')
      if (time.value <= 0) {
        pause()
      }
    },
    1000,
    false
  )
  onUnmounted(() => {
    pause()
  })
  // 开启倒计时
  const start = (countdown) => {
    time.value = countdown
    timeText.value = dayjs.unix(time.value).format('mm分ss秒')
    resume()
  }
  return { start, timeText }
}
