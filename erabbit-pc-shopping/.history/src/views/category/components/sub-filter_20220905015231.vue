<template>
  <!-- 筛选区 -->
  123
  <div class="sub-filter" v-if="filterData ">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a href="javascript:;" v-for="brand in filterData.brands" :key="brand.id">{{ brand.name }}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{ prop.name }}</a>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/cactegory'
export default {
  name: 'SubFilter',
  setup() {
    const route = useRoute()
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    const filterLoading = ref(false)
    watch(
      () => route.params.id,
      (newVal) => {
        // 变化后的ID值 且处在二级类目名路由下
        if (newVal && `/categroy/sub/${newVal}` === route.path) {
          filterLoading.value = true
          // 发起请求
          findSubCategoryFilter(route.params.id).then(({ result }) => {
            // 每一组可选的筛选条件缺失 全部 条件， 处理下数据加上全部
            // 1.品牌
            result.brands.unshift({ id: null, name: '全部' })
            // 2.属性
            result.saleProperties.forEach((item) => {
              item.properties.unshift({ id: null, name: '全部' })
            })
            // 设置修改的数据
            filterData.value = result
            console.log(result)
            console.log('123')
          })
        }
      },
      {
        immediate: true
      }
    )
    return { filterData }
  }
  // setup() {
  //   // 1. 获取数据
  //   // 2. 数据中需要全部选中，需要预览将来点击激活功能。默认选中全部
  //   // 3. 完成渲染
  //   const route = useRoute()
  //   const filterData = ref(null)
  //   const filterLoading = ref(false)
  //   // 4. 分类发生变化的时候需要重新获取筛选数据，需要使用侦听器
  //   watch(
  //     () => route.params.id,
  //     (newVal, oldVal) => {
  //       // 当你从二级分类去顶级分类也会拿到ID，不能去加载数据因为它不是二级分类的ID
  //       if (newVal && route.path === '/category/sub/' + newVal) {
  //         filterLoading.value = true
  //         newVal &&
  //           findSubCategoryFilter(route.params.id).then(({ result }) => {
  //             // 品牌全部
  //             result.selectedBrand = null
  //             result.brands.unshift({ id: null, name: '全部' })
  //             // 销售属性全部
  //             result.saleProperties.forEach((p) => {
  //               p.selectedProp = undefined
  //               p.properties.unshift({ id: null, name: '全部' })
  //             })
  //             filterData.value = result
  //             filterLoading.value = false
  //           })
  //       }
  //     },
  //     { immediate: true }
  //   )
  //   return { filterData, filterLoading }
  // }
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
