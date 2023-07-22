<template>
  <div class="home-new">
    <!-- 面板内容 -->
    <HomePanel>
      <ul class="goods-list">
        <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="">
            <p class="name ellipsis">{{item.name}}</p>
            <p class="price">&yen;{{item.price}}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue'
import { ref } from 'vue'
import { findNew } from '@/api/home'
export default {
  name: 'HomeNew',
  components: { HomePanel },
  setup() {
    const goods = ref([])
    findNew().then(data =>)

  }
}
</script>

<style lang="less" scoped></style>
