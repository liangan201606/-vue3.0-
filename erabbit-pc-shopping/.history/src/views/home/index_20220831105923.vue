<template>
  <div class="container">
    <div class="home-entry">
      <!-- 首页入口（分类+广告） -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
      <XtxCarousel></XtxCarousel>
    </div>
    <!-- 新鲜好物 -->
    <!--  -->
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
export default {
  name: 'HomePage',
  components: {
    HomeCategory
  }
}
</script>

<style lang="less" scoped></style>
