<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
        <!-- mode="out-in"表示动画是先出后进 使动画更加平滑 -->
      <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </transition>
  </XtxBread>
</template>

<script>
export default {

}
</script>

<style>

</style>