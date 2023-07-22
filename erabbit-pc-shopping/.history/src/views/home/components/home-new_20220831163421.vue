<template>
  <div class="home-new">
    <!-- 面板内容 -->
    <HomePanel></HomePanel>
  </div>
</template>

<script>
impport HomePanel from './home-panel.vue'
export default {
  name: 'HomeNew',
  components: { HomePanel }
}
</script>

<style lang="less" scoped></style>
