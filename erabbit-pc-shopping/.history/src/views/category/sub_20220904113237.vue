<template>
  <div class="Sub-Category">
    <div class="container">
      <!-- 面包屑 -->
      <subBread></subBread>
    </div>
  </div>
</template>

<script>
import subBread from './sub-bread.vue'
export default {
  name: 'SubCategory',
  components: {
    subBread
  }
}
</script>

<style></style>
