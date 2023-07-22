<template>
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{category.top.name}}</XtxBreadItem>
    <Transition name="fade-right" mode="out-in">
      <XtxBreadItem>空调</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
export default {

}
</script>

<style>

</style>