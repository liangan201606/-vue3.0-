<!-- 复选框组件封装 -->
<template>
  <div class="xtx-checkbox" @click="changeChecked()">
    <i v-if="checked" class="iconfont icon-checked"></i>
    <i v-else class="iconfont icon-unchecked"></i>
    <span v-if="$slots.default"><slot /></span>
  </div>
</template>
<script>
// import { ref,watch } from 'vue'
// v-model  ====>  :modelValue  +   @update:modelValue
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxCheckbox',
  // 实现双向绑定
  props: {
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  // 方法一：vue3.0中v-model会拆解成 属性 modelValue 和 事件 update:modelValue
  // setup(props, { emit }) {
  //   const checked = ref(false)
  //   const changeChecked = () => {
  //     checked.value = !checked.value
  //     // 使用emit通知父组件数据的改变 子传父
  //     emit('update:modelValue', checked.value)
  //   }
  //   // 使用侦听器 得到父组件传递数据 给checked数据
  //   watch(
  //     () => props.modelValue,
  //     () => {
  //       checked.value = props.modelValue
  //     },
  //     { immediate: true }
  //   )
  //    return { checked , changeChecked }
  // }

  // 方法二：@vueuse/core 的实现
  setup(props, { emit }) {
    // 使用useVModel实现双向数据绑定v-model指令
    // 1. 使用props接收modelValue
    // 2. 使用useVModel工具函数来包装props中的modelValue属性数据
    // 3. 在使用checked.value的时候就是使用父组件数据
    // 4. 在使用checked.value = '数据' 赋值，触发emit('update:modelvalue', '数据')
    const checked = useVModel(props, 'modelValue', emit)
    const changeChecked = () => {
      const newVal = !checked.value
      // 通知父组件 满足双向绑定
      checked.value = newVal
      // 让组件支持change事件
      emit('change', newVal)
    }
    return { checked, changeChecked }
  }
}
</script>
<style scoped lang="less">
.xtx-checkbox {
  display: inline-block;
  margin-right: 2px;
  .icon-checked {
    color: @xtxColor;
    ~ span {
      color: @xtxColor;
    }
  }
  i {
    position: relative;
    top: 1px;
  }
  span {
    margin-left: 2px;
  }
}
</style>
