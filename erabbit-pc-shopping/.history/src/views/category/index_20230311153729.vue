<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <!-- mode="out-in"表示动画是先出后进 使动画更加平滑 -->
        <transition name="fade-right" mode="out-in">
          <XtxBreadItem :key="topCategory.id">{{ topCategory.name }}</XtxBreadItem>
        </transition>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel auto-play :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="item in topCategory.children" :key="item.id">
            <a href="javascript:;">
              <img :src="item.picture" />
              <p>{{ item.name }}</p>
            </a>
          </li>
        </ul>
      </div>
      <!-- 分类关联商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="item in sub.goods" :key="item.id" :goods="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findBanner } from '@/api/home'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import GoodsItem from './components/goods-item.vue'
import { findTopCategory } from '@/api/cactegory'
export default {
  name: 'TopCategory',
  setup() {
    // 获取banner的数据 再传给banner组件进行渲染
    const sliders = ref([])
    findBanner().then((data) => {
      sliders.value = data.result
    })

    // 面包屑+所有子分类 === vuex
    const store = useStore()
    const route = useRoute()
    const topCategory = computed(() => {
      // 当前顶级分类 === 根据路由上的Id去vuex中category模块中的list查找
      // console.log(route.params.id)
      console.log(store.state.category.list)
      let cate = {}
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id
      })
      if (item) {
        cate = item
      }
      return cate
    })

    // 获取各个子类目下的推荐商品
    // 定义API，组件初始化要去加载数据，但是动态路由规则不会重新初始化组件
    // 如果监听地址栏id的变化，然后变化了就去加载数据，但是初始化有不会加载了。
    // watch提供了 immediate: true 可让watch初始化的时候主动触发一次。
    const subList = ref([])
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children
      })
    }
    watch(
      () => route.params.id,
      (newVal) => {
        // 当newVal存在时 调用函数
        // newVal && getSubList()
        // 切换到二级类目路由的时候也有ID，但是也触发了watch导致发送了请求，需要处理
        if (newVal && `/category/${newVal}` === route.path) getSubList()
      },
      {
        immediate: true
      }
    )
    return { sliders, topCategory, subList }
  },
  components: {
    GoodsItem
  }
}
</script>

<style scoped lang="less">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
}
</style>
