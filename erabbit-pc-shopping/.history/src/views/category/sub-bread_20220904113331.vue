<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem to="/">电器</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem>空调</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
export default {
  name: 'SubBread',
  setup(){
    // 通过计算属性获取
  }
}
</script>

<style></style>
