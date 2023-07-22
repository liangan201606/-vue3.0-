<template>
  <div class="container">
    <div class="home-entry">
      <!-- 首页入口（分类+广告） -->
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
    </div>
    <!-- 新鲜好物 -->
    <!-- 人气推荐 -->
  </div>
</template>

<script>
import HomeCategory from './components/home-category'
import HomeBanner from './components/'
export default {
  name: 'HomePage',
  components: {
    HomeCategory
  }
}
</script>

<style lang="less" scoped></style>
