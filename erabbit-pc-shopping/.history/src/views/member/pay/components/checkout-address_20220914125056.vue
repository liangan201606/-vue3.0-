<template>
  <div class="checkout-address">
    <div class="text">
      <!-- <div class="none">您需要先添加收货地址才可提交订单。</div> -->
      <ul>
        <li>
          <span>收<i />货<i />人：</span>{{ showAddress.receiver }}
        </li>
        <li><span>联系方式：</span>{{ showAddress.contact }}</li>
        <li><span>收货地址：</span>{{showAddress.fullLocation.replace(/ /g,'')+showAddress.address}}</li>
      </ul>
      <a href="javascript:;">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn">切换地址</XtxButton>
      <XtxButton class="btn">添加地址</XtxButton>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  name: 'CheckoutAddress',
  props: {
    // 收获地址列表
    list: {
      tyep: Array,
      default: () => []
    }
  },
  setup(props) {
    // 1.找到默认收获地址
    // 2.没有默认收获地址 使用第一条收获地址
    // 3.如果没有 显示请添加一条收货地址
    const showAddress = ref(null)
    // 取出默认的收获地址
    const defaultAddress = props.list.find((item) => item.isDefault === 0)
    if(defaultAddress) {
      showAddress.value = defaultAddress
    }else {
      if(props.list.length) {
        
      }
      showAddress.value = props.list[0]
    }
    return { showAddress }
  }
}
</script>
<style scoped lang="less">
.checkout-address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
