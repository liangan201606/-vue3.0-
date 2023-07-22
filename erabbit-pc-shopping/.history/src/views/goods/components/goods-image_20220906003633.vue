<!-- 商品图片预览功能和切换 -->
<template>
  <div class="goods-image">
    <!-- 准备大图容器 -->
    <div v-show="show" class="large" :style="[{ backgroundImage: `url(${images[currIndex]})` }]" ></div>
    <div class="middle">
      <img :src="images[currIndex]" alt="" />
      <!-- 遮罩容器 -->
      <div v-show="show" class="layer" :style="layerPosition"></div>
    </div>
    <ul class="small">
      <li v-for="(img, i) in images" :key="img" :class="{ active: i === currIndex }">
        <img @mouseenter="currIndex = i" :src="img" alt="" />
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive, ref } from 'vue'
import { useMouseInElement } from '@vueuse/core'
export default {
  name: 'GoodsImage',
  props: {
    images: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    // 纪录当前图片索引
    const currIndex = ref(0)
    // 1.是否显示遮罩
    const show = ref(false)
    // 2.遮罩的坐标(样式)
    const layerPosition = reactive({
      left: 0,
      top: 0
    })
    // 3.大图背景的定位(样式)
    const lagerPosition = reactive({
      backgroundPositionX: 0,
      backgroundPositionY: 0
    })
    return { currIndex, show, layerPosition, lagerPosition }
  }
}
</script>
<style scoped lang="less">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;
  z-index: 500;
  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }
  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
    position: relative;
    cursor: move; // 鼠标效果
    .layer {
      width: 200px;
      height: 200px;
      background: rgba(0, 0, 0, 0.2);
      left: 0;
      top: 0;
      position: absolute;
    }
  }
  .small {
    width: 80px;
    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
    }
  }
}
</style>
