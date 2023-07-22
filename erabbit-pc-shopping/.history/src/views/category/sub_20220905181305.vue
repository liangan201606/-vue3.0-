<template>
  <div class="Sub-Category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选组件 -->
      <SubFilter></SubFilter>
      <!-- 商品面板（排序+列表） -->
      <div class="goods-list">
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="item in goodList" :key="item.id">
            <GoodsItem :goods="item" />
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <XtxInfiniteLoading @infinite="getData" :loading="loading" :finished="finished"></XtxInfiniteLoading>
      </div>
    </div>
  </div>
</template>

<script>
import SubBread from './components/sub-bread'
import SubFilter from './components/sub-filter.vue'
import SubSort from './components/sub-sort'
import GoodsItem from './components/goods-item'
import { findSubCategoryGoods } from '@/api/cactegory.js'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
export default {
  name: 'SubCategory',
  components: {
    SubBread,
    SubFilter,
    SubSort,
    GoodsItem
  },
  setup() {
    const route = useRoute()
    // 加载中
    const loading = ref(false)
    // 是否加载完毕
    const finished = ref(false)
    // 商品列表数据
    const goodList = ref([])
    // 请求参数
    let reqParams = {
      page: 1,
      pageSize: 20
    }
    const getData = () => {
      loading.value = true
      // 设置二级分类id
      reqParams.categoryId = route.params.id
      // 发起请求
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 数据获取成功
        if (result.items.length) {
          // 有数据就追加数据
          goodList.value.push(...result.items)
          // 把page改成下一页
          reqParams.page++
        } else {
          // 没有数据 加载完成
          finished.value = true
        }
        // 请求结束
        loading.value = false
      })
    }
    // 切换二级分类重新加载加载数据
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && route.path === '/category/sub/' + newVal) {
          goodList.value = [] // 导致列表是空的，加载更多组件顶上来，进入可视区域，加载数据
          reqParams = {
            page: 1,
            pageSize: 20
          }
          finished.value = false
        }
      }
    )
    // 1.更改排序组件的筛选数据，重新请求
    const sortChange = (sortParams) => {
      finished.value = false
      // 合并参数 保留之前的参数
      reqParams = { ... reqParams, ...sortParams}
      reqParams.page = 1
      goodList.value = []
    }
    // 2.更改筛选组件的筛选数据， 重新请求
    return { getData, loading, finished, goodList, sortChange }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  background: #fff;
  padding: 0 25px;
  margin-top: 25px;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      margin-right: 20px;
      margin-bottom: 20px;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
