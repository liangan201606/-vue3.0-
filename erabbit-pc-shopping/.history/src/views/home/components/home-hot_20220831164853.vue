<template>
  <div class=""></div>
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
      list.value = data.result
    })
    return { list }
  }
}
</script>

<style>

</style>