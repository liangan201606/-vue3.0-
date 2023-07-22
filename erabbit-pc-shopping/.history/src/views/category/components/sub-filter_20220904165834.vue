<template>
  <!-- 筛选区 -->
  <div class="sub-filter">
    <div class="item" v-for="i in 4" :key="i">
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:;">全部</a>
        <a href="javascript:;" v-for="i in 4" :key="i">小米</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategroyFilter } from '@/api/cactegory'
export default {
  name: 'SubFilter',
  setup() {
    const route = useRoute()
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    watch(
      () => route.params.id,
      (newVal) => {
        // 变化后的ID值 且处在二级类目名路由下
        if (newVal && `/categroy/sub/${newVal}` === route.path) {
          // 发起请求
          findSubCategroyFilter(route.params.id).then((data) => {
            // 每一可选的筛选条件缺失 全部 条件， 处理下数据加上全部
            // 1.品牌
            data.result.brands.unshift({ id: null, name: '全部' })
            // 2.shu
          })
        }
      }
    )
    return { filterData }
  }
}
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>
