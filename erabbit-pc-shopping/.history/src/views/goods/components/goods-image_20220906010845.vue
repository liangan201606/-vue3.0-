<!-- 商品图片预览功能和切换 -->
<template>
  <div class="goods-image">
    <!-- 准备大图容器 -->
    <div v-show="show" class="large" :style="[{ backgroundImage: `url(${images[currIndex]})`},lagerPosition]"></div>
    <div class="middle" ref="target">
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
import { reactive, ref, watch } from 'vue'
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
      backgroundPositionX: 0, backgroundPositionY: 0
    })
    // 4.使用useMouseInElement得到基于元素左上角的坐标和是否离开元素
    const target = ref(null)
    const { elementX, elementY, isOutside } = useMouseInElement(target)
    watch([elementX, elementY, isOutside], () => {
      // console.log(elementX.value)
      // console.log(elementY.value)
      // console.log(isOutside.value)
      // 5.根据数据设置样式数据和是否显示数据
      show.value = !isOutside.value
      const position = { x: 0, y: 0 }
      // 控制X轴方向的定位 0-200 之间
      if (elementX.value < 100) position.x = 0
      else if (elementX.value > 300) position.x = 200
      else position.x = elementX.value - 100
      // 控制y轴方向的定位 0-200 之间
      if (elementY.value < 100) position.y = 0
      else if (elementY.value > 300) position.y = 200
      else position.y = elementY.value - 100

      // 给样式赋值
      // 设置遮罩容器的定位
      layerPosition.left = position.x + 'px'
      layerPosition.top = position.y + 'px'
      // 设置大背景的定位
      lagerPosition.left = -2 * position.x + 'px'
      lagerPosition.top = -2 * position.y + 'px'
    })
    return { currIndex, show, layerPosition, lagerPosition, target }
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
