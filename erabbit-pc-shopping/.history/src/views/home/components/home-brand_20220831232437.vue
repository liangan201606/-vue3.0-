<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <!-- 上一页 -->
      <a href="javascript:;" class="iconfont icon-angle-left prev" @click="toggle(-1)"></a>
      <a href="javascript:;" class="iconfont icon-angle-right next" @click="toggle(1)"></a>
    </template>
    <div class="box" ref="box">
      <ul class="list">
        <li v-for="item in brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
          </RouterLink>
        </li>
      </ul>
    </div>
  </HomePanel>
</template>

<script>
import { findBrand } from '@/api/home'
import HomePanel from './home-panel'
import { ref } from 'vue'
export default {
  name: 'HomeBrand',
  components: { HomePanel },
  setup() {
    const brands = ref([])
    findBrand(10).then((data) => {
      brands.value = data.result
    })
    // 获取数据
    // 切换效果 只有0 1俩页
    const index = ref(0)
    // 1.点击上一页
    // 2.点击下一页
    const toggle = (step) => {
      const newIndex = index.value+step
      if(newIndex<0 || )
    }
    return { brands }
  }
}
</script>

<style scoped lang="less">
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
