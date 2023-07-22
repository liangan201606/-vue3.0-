<!-- 准备xtx-carousel组件基础布局，全局注册 -->
<!-- 准备home-banner组件，使用xtx-carousel组件，再首页注册使用。 -->
<!-- 深度作用xtx-carousel组件的默认样式 -->
<template>
  <div class="xtx-carousel">
    <ul class="carousel-body">
      <!-- fade 显示图片加上fade -->
      <li class="carousel-item" v-for="(item, i) in sliders" :key="i" :class="{ fade: index === i }">
        <RouterLink to="/">
          <img :src="item.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <!-- active激活点 -->
      <span v-for="(item, i) in sliders" :key="i" :class="{ active: index === i }"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'XtxCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => []
    },
    // 是否自动播放
    autoPlay: {
      tyep: Boolean,
      default: false
    },
    // 间隔时长
    duration: {
      type: Number,
      default: 1000
    }
  },
  setup(props) {
    // 控制显示图片的索引
    const index = ref(0)
    // 1.自动轮播图的逻辑
    let timer = null // eslint-disable-line no-unused-vars
    const autoPlayFn = () => {
      // 自动播放的逻辑 每隔过久切换一次索引
      clearInterval(timer)//防止定时器重复调用
      timer = setInterval(() => {
        index.value++
        if (index.value >= props.sliders.length) {
          index.value = 0
        }
        console.log(index)
      }, props.duration)
    }
    // 需要监听sliders的数据变化 判断如果有数据且autoPlay为true 自动播放
    watch(
      () => props.sliders,
      (newVal) => {
        if (newVal.length && props.autoPlay) {
          autoPlayFn()
        }
      },
      { immediate: true }
    )

    // 2.鼠标进入暂停 离开后开启自动播放
    const top = () => {
      if (timer) clearInterval(timer)
    }
    const start = () =>{
      if(props.sliders.length)
    }
    return { index }
  }
}
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
