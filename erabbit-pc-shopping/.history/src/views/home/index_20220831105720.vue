<template>
  <div class="container">
    <!-- 首页入口（分类+广告） -->
    <div class="home-entry">
      <HomeCategory></HomeCategory>
      <!-- 轮播图 -->
    </div>
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
