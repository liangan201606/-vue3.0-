<template>
  <!-- 筛选区 -->
  <!-- 有数据并且没有在加载中 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌：</div>
      <div class="body">
        <a @click="changeBrand(brand.id)" :class="{ active: brand.id === filterData.brands.selectedBrand }" href="javascript:;" v-for="brand in filterData.brands" :key="brand.id">{{ brand.name }}</a>
      </div>
    </div>
    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head">{{ item.name }}：</div>
      <div class="body">
        <a @click="changeProp(item, prop.id)" :class="{ active: prop.id === item.properties.selectedProp }" href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{ prop.name }}</a>
      </div>
    </div>
  </div>
  <!-- 在加载中显示加载效果 -->
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { findSubCategoryFilter } from '@/api/cactegory'
export default {
  name: 'SubFilter',
  setup(props, { emit }) {
    const route = useRoute()
    // 监听二级类目ID的变化获取筛选数据
    const filterData = ref(null)
    // 数据加载的情况
    const filterLoading = ref(false)
    watch(
      () => route.params.id,
      (newVal) => {
        // 变化后的ID值 且处在二级类目名路由下
        if (newVal && route.path === `/category/sub/${newVal}`) {
          filterLoading.value = true
          // 发起请求
          findSubCategoryFilter(route.params.id).then(({ result }) => {
            // 每一组可选的筛选条件缺失 全部 条件， 处理下数据加上全部
            // 给每一组数据加上一个选中的ID
            // 1.品牌
            result.brands.selectedBrand = null // 选中颜色改变 获取每一项属性内容的id
            result.brands.unshift({ id: null, name: '全部' })
            // 2.属性
            result.saleProperties.forEach((item) => {
              item.properties.selectedProp = null
              item.properties.unshift({ id: null, name: '全部' })
            })
            // 设置修改的数据
            filterData.value = result
            filterLoading.value = false
            // console.log(result)
          })
        }
      },
      {
        immediate: true
      }
    )
    // 获取筛选参数函数
    const getFilterParams = () => {
      // 参考数据：{nrandId:'',attrs:[{groupName:'',propertyName:''},...]}
      const obj = { brandId: null, attrs: [] }
      // 品牌
      obj.brandId = filterData.value.brands.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach((item) => {
        if (item.properties.selectedProp) {
          const prop = item.properties.find((prop) => prop.id === item.properties.selectedProp)
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }
    // 1.记录当前选择的品牌
    const changeBrand = (brandId) => {
      if (filterData.value.brands.selectedBrand === brandId) return
      filterData.value.brands.selectedBrand = brandId
      // 向父组件传递查询参数
      emit('filter-change', getFilterParams())
    }
    // 2.记录当前选择的销售
    const changeProp = (item, propId) => {
      if (item.properties.selectedProp === propId) return
      item.properties.selectedProp = propId
      // 向父组件传递查询参数
      emit('filter-change', getFilterParams())
    }
    return { filterData, filterLoading, changeBrand, changeProp }
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
  .xtx-skeleton {
    padding: 10px 0;
  }
}
</style>
