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
    <!-- 品牌推荐 -->
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/home-banner'
import HomeNew from './components/home-new'
import HomeHot from './components/home-hot'
impo
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
// 多个transition使用不同动画，可以添加nam属性，name属性的值替换v即可
// vue2.0
// 进入v-enter v-enter-active v-enter-to
// 离开v-leave v-leave-active v-leave-to
// vue3.0
// 进入v-enter-from v-enter-active v-enter-to
// 离开v-leave-from v-leave-active v-leave-to
</style>
