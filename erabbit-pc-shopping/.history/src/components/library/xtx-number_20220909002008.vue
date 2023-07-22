<template>
  <div class="xtx-numbox">
    <div class="label" v-if="label">{{label}}</div>
    <div class="numbox">
      <a href="javascript:;" @click="changeNum(-1)">-</a>
      <input type="text" readonly :value="moduleValue" />
      <a href="javascript:;" @click="changeNum(1)">+</a>
    </div>
  </div>
</template>
<script>
import { useVModel } from '@vueuse/core'
export default {
  name: 'XtxNumbox',
  props: {
    moduleValue: {
      type: Number,
      default: 1
    },
    // 最小值 ，最大值
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 1
    },
    label: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    // 1.点击按钮绑定事件 - + 触发通一个函数
    // 2.使用vueuse的useModel做双向数据绑定 修改count 通知父组件
    const count = useVModel(props, 'modelValue', emit)
    const changeNum = (step) => {
      // 3.得到将要改变的值 判断是否在有效范围内
      const newValue = count.value + step
      if (newValue < props.min || newValue > props.max) return
      // 4.正常修改值
      count.value = newValue
      console.log(newValue)
      // 5. 提供change事件
      emit('change', newValue)
    }
    return { changeNum }
  }
}
</script>
<style scoped lang="less">
.xtx-numbox {
  display: flex;
  align-items: center;
  .label {
    width: 60px;
    color: #999;
    padding-left: 10px;
  }
  .numbox {
    width: 120px;
    height: 30px;
    border: 1px solid #e4e4e4;
    display: flex;
    > a {
      width: 29px;
      line-height: 28px;
      text-align: center;
      background: #f8f8f8;
      font-size: 16px;
      color: #666;
      &:first-of-type {
        border-right: 1px solid #e4e4e4;
      }
      &:last-of-type {
        border-left: 1px solid #e4e4e4;
      }
    }
    > input {
      width: 60px;
      padding: 0 5px;
      text-align: center;
      color: #666;
    }
  }
}
</style>
