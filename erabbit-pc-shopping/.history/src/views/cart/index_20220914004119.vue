<template>
  <div class="xtx-cart-page">
    <div class="container">
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>购物车</XtxBreadItem>
      </XtxBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120"><XtxCheckbox @change="checkAll" :modelValue="$store.getters['car/isCheckAll']">全选</XtxCheckbox></th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="$store.getters['car/validList'].length === 0">
              <td colspan="6">
                <CartNone />
              </td>
            </tr>
            <tr v-for="item in $store.getters['car/validList']" :key="item.skuId">
              <!--($event) => checkOne(item.skuId, $event)既能拿到默认参数 又能传参  -->
              <td><XtxCheckbox :modelValue="item.selected" @change="($event) => checkOne(item.skuId, $event)" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`"><img :src="item.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <!-- 选择规格组件 -->
                    <CartSku  :attrsText="item.attrsText" :skuId="item.skuId"/>
                    <!-- <p class="attr">{{ item.attrsText }}</p> -->
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
                <p v-if="item.price - item.nowPrice > 0">
                  比加入时降价 <span class="red">&yen;{{ item.price - item.nowPrice }}</span>
                </p>
              </td>
              <td class="tc">
                <XtxNumbox :max="item.stock" @change="($event) => changeCount(item.skuId, $event)" :modelValue="item.count" />
              </td>
              <td class="tc">
                <p class="f16 red">&yen;{{ (item.nowPrice * 100 * item.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a href="javascript:;">移入收藏夹</a></p>
                <p><a class="green" href="javascript:;" @click="deleteCart(item.skuId)">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody>
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr v-for="item in $store.getters['car/invalidList']" :key="item.skuId">
              <td><XtxCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink to="/"><img :src="item.picture" alt="" /></RouterLink>
                  <div>
                    <p class="name ellipsis">{{ item.name }}</p>
                    <p class="attr">{{ item.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ item.nowPrice }}</p>
              </td>
              <td class="tc">{{ item.count }}</td>
              <td class="tc">
                <p>&yen;{{ (item.nowPrice * 100 * item.count) / 100 }}</p>
              </td>
              <td class="tc">
                <p><a class="green" href="javascript:;">删除</a></p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <!-- <XtxCheckbox :modelValue="$store.getters['car/isCheckAll']" @change="checkAll">全选</XtxCheckbox> -->
          <XtxCheckbox @change="checkAll" :modelValue="$store.getters['car/isCheckAll']">全选</XtxCheckbox>
          <a href="javascript:;" @click="batchDeleteCart">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;" @click="batchDeleteCart(true)">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters['car/validTotal'] }} 件商品，已选择 {{ $store.getters['car/selectedTotal'] }} 件，商品合计：
          <span class="red">{{ $store.getters['car/selectedAmount'] }}</span>
          <XtxButton type="primary">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodRelevant />
    </div>
  </div>
</template>
<script>
import GoodRelevant from '@/views/goods/components/goods-relevant'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
import CartNone from './components/cart-none.vue'
import confirm from '@/components/library/confirm'
import CartSku from './components/cart-sku'
export default {
  name: 'XtxCartPage',
  components: { GoodRelevant, CartNone, CartSku },
  setup() {
    const store = useStore()
    // 单选
    const checkOne = (skuId, selected) => {
      store.dispatch('car/updateCart', { skuId, selected })
    }
    // 全选
    const checkAll = (selected) => {
      store.dispatch('car/checkAllCart', selected)
    }
    // 删除
    const deleteCart = (skuId) => {
      // store.dispatch('car/deleteCart', skuId).then(() => {
      //   Message({ type: 'success', text: '删除成功' })
      // })
      confirm({ text: '你确认从购物车中删除该商品吗？' })
        .then(() => {
          store.dispatch('car/deleteCart', skuId)
        })
        .catch((e) => {
          Message({ type: 'success', text: '取消删除' })
        })
    }
    // 批量删除
    const batchDeleteCart = (isclear) => {
      confirm({ text: '你确认从购物车中删除选中的商品吗？' })
        .then(() => {
          store.dispatch('car/batchDeleteCart', isclear)
        })
        .catch((e) => {})
    }
    // 修改数量
    const changeCount = (skuId, count) => {
      store.dispatch('car/updateCart', { skuId, count })
    }
    return { checkOne, checkAll, deleteCart, batchDeleteCart, changeCount }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .xtx-checkbox {
    color: #999;
  }
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
