<!-- 选择面板 -->
<template>
  <!-- 装载是内容 -->
  <div class="xtx-tabs-panel" v-show="activeName === name">
    <slot />
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'XtxTabsPanel',
  props: {
    // 标签页标题文章 name 选项卡唯一标识 $slot.default()默认插槽内容
    label: {
      type: String,
      default: ''
    },
    // 唯一标识
    name: {
      type: [String, Number],
      default: ''
    }
  },
  setup() {
    // 当前组件该不该显示，取决于xtx-tabs组件的activeName数据是否和props.name一样
    const activeName = inject('activeName')
    return { activeName }
  }
}
</script>

<style lang="less" scoped></style>
