<template>
  <div class="goods-detail">
    <!-- 属性 -->
    <ul class="attrs">
      <li>
        <span class="dt"></span>
        <span class="dd"></span>
      </li>
    </ul>
    <!-- 图片 -->
    <img alt="" />
  </div>
</template>
<script>
export default {
  name: 'GoodsDetail',
  
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
