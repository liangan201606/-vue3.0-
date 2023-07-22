<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <div ref="target" style="position: relative;height: 426px;">
      <Transition name="fade">
        <ul ref="pannel" class="goods-list" v-if="list.length">
          <li v-for="item in list" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton v-else></HomeSkeleton>
      </Transition>
    <

  </HomePanel>
</template>

<script>
import HomePanel from './home-panel.vue'
import { ref } from 'vue'
import { findHot } from '@/api/home'
import HomeSkeleton from './home-skeleton.vue'
export default {
  name: 'HomeHot',
  components: { HomePanel, HomeSkeleton },
  setup() {
    const list = ref([])
    findHot().then((data) => {
      list.value = data.result
    })
    return { list }
  }
}
</script>

<style lang="less" scoped>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  li {
    width: 306px;
    height: 406px;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }
    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
