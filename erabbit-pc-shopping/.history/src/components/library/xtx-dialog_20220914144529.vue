<!-- 对话框组件封装 -->
<template>
  <div class="xtx-dialog" :class="{ fade }">
    <div class="wrapper" :class="{ fade }">
      <div class="header">
        <h3>{{ title }}</h3>
        <a href="JavaScript:;" class="iconfont icon-close-new"></a>
      </div>
      <div class="body"><slot /></div>
      <div class="footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
<script>
// vue3.0 v-model:visible 语法糖 拆解 (:visible + @update:visible )
import { ref, watch } from 'vue'
export default {
  name: 'XtxDialog',
  props: {
    title: {
      type: String,
      default: '切换地址'
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const fade = ref(false)
    // onMounted(() => {
    //   // 结构和样式同时加上无过度效果，需要些延时。
    //   setTimeout(() => {
    //     fade.value = true
    //   }, 0)
    // })
    // 改造动画执行时机
    // visible的值为true的时候 打开对话框
    watch(
      () => props.visible,
      () => {
        setTimeout(() => {
          fade.value = props.visible
        }, 0)
      },
      { immediate: true }
    )
    // 关闭的时候通知父组件
    const close = () => {
      emit('update:visible', false)
    }
    return { fade, close }
  }
}
</script>
<style scoped lang="less">
.xtx-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 8887;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .wrapper {
    width: 600px;
    background: #fff;
    border-radius: 4px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    opacity: 0;
    &.fade {
      transition: all 0.4s;
      transform: translate(-50%, -50%);
      opacity: 1;
    }
    .body {
      padding: 20px 40px;
      font-size: 16px;
      .icon-warning {
        color: @priceColor;
        margin-right: 3px;
        font-size: 16px;
      }
    }
    .footer {
      text-align: center;
      padding: 10px 0 30px 0;
    }
    .header {
      position: relative;
      height: 70px;
      line-height: 70px;
      padding: 0 20px;
      border-bottom: 1px solid #f5f5f5;
      h3 {
        font-weight: normal;
        font-size: 18px;
      }
      a {
        position: absolute;
        right: 25px;
        top: 25px;
        font-size: 24px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #999;
        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
