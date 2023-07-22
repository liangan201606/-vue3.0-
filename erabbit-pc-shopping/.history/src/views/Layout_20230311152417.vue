<template>
  <!-- 顶部通栏 -->
  <AppNavbar></AppNavbar>
  <!-- 头部通栏 -->
  <AppHeader></AppHeader>
  <!-- 吸顶头部组件 -->
  <AppHeaderSticky></AppHeaderSticky>
  <!-- 内容容器 -->
  <div class="main">
    <!-- 二级路由 -->
    <RouterView />
  </div>
  <!-- 底部通栏 -->
  <AppFooter>底部通栏</AppFooter>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
import { useStore } from 'vuex'
export default {
  name: 'Layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  // 获取下分类数据
  // 获取数据在 src/views/Layout.vue 初始化的时候
  setup() {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>

<style lang="less" scoped></style>
