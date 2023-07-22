<template>
  <div class="Sub-Category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选组件 -->
      <SubFilter></SubFilter>
      <!-- 结果区域 -->
      <div class="goods-list">

      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort'
import { ref } from 'vue'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter
  },
  setup () {
    const isAllchecked = ref(true)
    return { isAllchecked }
  }
}
</script>

<style></style>
