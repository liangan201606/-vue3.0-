<template>
  <div class="order-list">
    <div class="order-item">
      <div class="head">
        <span>下单时间：{{ order.createTime }}</span>
        <span>订单编号：{{ order.id }}</span>
        <!-- 未付款，倒计时时间还有 -->
        <span class="down-time" v-if="order.orderState === 1">
          <i class="iconfont icon-down-time"></i>
          <b>付款截止：{{ order.countdown }}</b>
        </span>
        <!-- 已完成 已取消 -->
        <a v-if="[5, 6].includes(order.orederState)" href="javascript:;" class="del">删除</a>
      </div>
      <div class="body">
        <!-- 商品信息 -->
        <div class="column goods">
          <ul>
            <li v-for="item in order.skus" :key="goods.id">
              <RouterLink class="image" :to="`/product/${item.id}`">
                <img :src="item.image" alt="" />
              </RouterLink>
              <div class="info">
                <p class="name ellipsis-2">{{ item.name }}</p>
                <p class="attr ellipsis">{{ item.attrsText }}}</p>
              </div>
              <div class="price">¥{{ item.realPay }}</div>
              <div class="count">x{{ item.quantity }}</div>
            </li>
          </ul>
        </div>
        <!-- 订单状态 -->
        <div class="column state">
          <p>{{ orderStatus[order.orderState].label }}</p>
          <!-- 待收货：查看物流 -->
          <!-- 待评价：评价商品 -->
          <!-- 已完成：查看评价 -->
          <p v-if="order.orderState === 3"><a href="javascript:;" class="green">查看物流</a></p>
          <p v-if="order.orderState === 4"><a href="javascript:;" class="green">评价商品</a></p>
          <p v-if="order.orderState === 5"><a href="javascript:;" class="green">查看评价</a></p>
        </div>
        <!-- 总金额 -->
        <div class="column amount">
          <p class="red">¥{{order.payMoney}}</p>
          <p>（含运费：¥{{order.postFee}}）</p>
          <p>在线支付</p>
        </div>
        <div class="column action">
          <!-- 待支付：立即付款，查看详情，取消订单 -->
          <!-- 待发货：查看详情，再次购买 -->
          <!-- 待收货：确认收货，查看详情，再次购买 -->
          <!-- 待评价：查看详情，再次购买，申请售后 -->
          <!-- 已完成：查看详情，再次购买，申请售后 -->
          <!-- 已取消：查看详情 -->
          <XtxButton v-if="order.orderState===1" type="primary" size="small">立即付款</XtxButton>
          <XtxButton v-if="order.orderState===3" type="primary" size="small">确认收货</XtxButton>
          <p><a href="javascript:;">查看详情</a></p>
          <p v-if="order.orderState===1"><a href="javascript:;">取消订单</a></p>
          <p v-if="[2,3,4,5].includes(order.orderState)"><a href="javascript:;">再次购买</a></p>
          <p v-if="[4,5].includes(order.orderState)"><a href="javascript:;">申请售后</a></p>
        </div>
      </div>
    </div>
  </div>
  <!-- 分页组件 -->
</template>

<script>
import { orderStatus } from '@/api/constants'
export default {
  name: 'OrderItem',
  props: {
    order: {
      type: Object,
      default: () => ({})
    }
  },
  sertup() {
    return { orderStatus }
  }
}
</script>

<style lang="less" scoped>
.order-item {
  margin-bottom: 20px;
  border: 1px solid #f5f5f5;
  .head {
    height: 50px;
    line-height: 50px;
    background: #f5f5f5;
    padding: 0 20px;
    overflow: hidden;
    span {
      margin-right: 20px;
      &.down-time {
        margin-right: 0;
        float: right;
        i {
          vertical-align: middle;
          margin-right: 3px;
        }
        b {
          vertical-align: middle;
          font-weight: normal;
        }
      }
    }
    .del {
      margin-right: 0;
      float: right;
      color: #999;
    }
  }
  .body {
    display: flex;
    align-items: stretch;
    .column {
      border-left: 1px solid #f5f5f5;
      text-align: center;
      padding: 20px;
      > p {
        padding-top: 10px;
      }
      &:first-child {
        border-left: none;
      }
      &.goods {
        flex: 1;
        padding: 0;
        align-self: center;
        ul {
          li {
            border-bottom: 1px solid #f5f5f5;
            padding: 10px;
            display: flex;
            &:last-child {
              border-bottom: none;
            }
            .image {
              width: 70px;
              height: 70px;
              border: 1px solid #f5f5f5;
            }
            .info {
              width: 220px;
              text-align: left;
              padding: 0 10px;
              p {
                margin-bottom: 5px;
                &.name {
                  height: 38px;
                }
                &.attr {
                  color: #999;
                  font-size: 12px;
                  span {
                    margin-right: 5px;
                  }
                }
              }
            }
            .price {
              width: 100px;
            }
            .count {
              width: 80px;
            }
          }
        }
      }
      &.state {
        width: 120px;
        .green {
          color: @xtxColor;
        }
      }
      &.amount {
        width: 200px;
        .red {
          color: @priceColor;
        }
      }
      &.action {
        width: 140px;
        a {
          display: block;
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
