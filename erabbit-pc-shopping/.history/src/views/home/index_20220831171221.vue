<template>
  <div class="container">
    <div class="home-entry">
      <!-- 首页入口（分类+广告） -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <HomeBanner></HomeBanner>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew></HomeNew>
    <!-- 人气推荐 -->
    <HomeHot></HomeHot>
    <!-- 使用transtion组件 -->
    <button @click="show = true">显示|创建</button>
    <button @click="show = false">隐藏|移除</button>
    <Transition>
      <div v-show="show" style="width: 100px; height: 100px; background: pink"></div>
    </Transition>
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
import { ref } from 'vue'
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot
  },
  setup() {
    const show = ref(true)
    return { show }
  }
}
</script>

<style lang="less" scoped>
// 进入v-enter v-enter-active v-enter-to
// 离开v-leave v-leave-active v-leave-to
.v-enter{
  opacity: 0;
}
.v-enter-active{
  transition: all 2s;
}
.v-enter-to{
  opacity: 1;
}
</style>
