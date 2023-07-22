<template>
  <div class="goods-hot">
    <h3>{{title}}</h3>
    <div>
      <GoodsItem />
    </div>
  </div>
</template>
<script>
import GoodsItem from '@/views/category/components/goods-item'
import { computed } from 'vue'
export default {
  name: 'GoodsHot',
  compents: { GoodsItem },
  props: {
    type: {
      type: Number,
      default: 1
    },
    goodsId: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 获取标题
    const types = { 1: '24小时热销榜', 2: '周热销榜', 3: '总热销榜' }
    const title = computed(() => {
      return types[props.type]
    })
    // 获取商品列表
    return { types, title }
  }
}
</script>
<style lang="less" scoped>
.goods-hot {
  h3 {
    height: 70px;
    background: @helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }
  ::v-deep .goods-item {
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
    img {
      width: 200px;
      height: 200px;
    }
    p {
      margin: 0 10px;
    }
    &:hover {
      transform: none;
      box-shadow: none;
    }
  }
}
</style>
