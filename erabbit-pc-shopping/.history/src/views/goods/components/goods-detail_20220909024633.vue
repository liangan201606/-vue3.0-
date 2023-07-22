<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li v-for="item in goods.detail.properties" >
        <span class="dt"></span>
        <span class="dd"></span>
      </li>
    </ul>
    <!-- 图片 -->
    <img alt="" />
  </div>
</template>
<script>
import { inject } from 'vue'
export default {
  name: 'GoodsDetail',
  // 接受index传递进来的数据
  setup() {
    const goods = inject('goods')
    return { goods }
  }
}
</script>
<style scoped lang="less">
.goods-detail {
  padding: 40px;
  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;
    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;
      .dt {
        width: 100px;
        color: #999;
      }
      .dd {
        flex: 1;
        color: #666;
      }
    }
  }
  > img {
    width: 100%;
  }
}
</style>
