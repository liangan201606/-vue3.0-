<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #right><XtxMore path="/" /></template>
</template>

<script>
import HomePanel from './home-panel.vue'
import { ref } from 'vue'
import { findHot } from '@/api/home'
export default {
  name: 'HomeHot',
  components: { HomePanel },
  setup() {
    const list = ref([])
    findHot().then(data => {
      list.value = data.r
    })
  }
}
</script>

<style>

</style>