<template>
  <div class="sub-sort">
    <div class="sort">
      <a href="javascript:;" :class="{ active: sortParams.sortField === null }" @click="changeSort(null)">默认排序</a>
      <a href="javascript:;" :class="{ active: sortParams.sortField === 'publishTime' }" @click="changeSort('publishTime')">最新商品</a>
      <a href="javascript:;" :class="{ active: sortParams.sortField === 'orderNum' }" @click="changeSort('orderNum')">最高人气</a>
      <a href="javascript:;" :class="{ active: sortParams.sortField === 'evaluateNum' }" @click="changeSort('evaluateNum')">评论最多</a>
      <a href="javascript:;" @click="changeSort('price')">
        价格排序
        <i class="arrow up" :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'asc' }" />
        <i class="arrow down" :class="{ active: sortParams.sortField === 'price' && sortParams.sortMethod === 'desc' }" />
      </a>
    </div>
    <div class="check">
      <!-- change事件来自xtx-checked组件中 -->
      <XtxCheckbox @change="changeCheck" v-model="sortParams.inventory">仅显示有货商品</XtxCheckbox>
      <XtxCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount">仅显示特惠商品</XtxCheckbox>
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue'
export default {
  name: 'SubSort',
  // 实现交互
  setup(props, { emit }) {
    // 1. 根据后台需要的参数定义数据对象
    // 2. 根据数据对象，绑定组件（复选框，排序按钮）
    // 3. 在操作排序组件的时候，需要反馈给数据对象
    // sortField====>publishTime,orderNum,price,evaluateNum
    const sortParams = reactive({
      // 是否有库存
      inventory: false,
      // 只显示特惠
      onlyDiscount: false,
      // 排序字段
      sortField: null,
      // 排序规则，asc为正序，desc为倒序，默认为desc
      sortMethod: null
    })
    // 绑定按钮点击事件修改排序字段和排序方式
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        sortParams.sortField = sortField
        // 处理排序
        // 第一次点击 默认倒序
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc'
        } else {
          // 其他情况根据当前排序取反
          sortParams.sortMethod = sortParams.sortMethod === 'desc' ? 'asc' : 'desc'
        }
      } else {
        // 如果已经选中阻止运行
        if (sortParams.sortField === sortField) return
        sortParams.sortField = sortField
        sortParams.sortMethod = null
      }
      // 触发sort-change事件 传出排序参数
      emit('sort-change', sortParams)
    }
    // 按照商品排序
    const changeCheck = () => {
      // 触发sort-change事件 向父组件传出排序参数
      emit('sort-change', sortParams)
    }
    return { sortParams, changeSort, changeCheck }
  }
}
</script>
<style scoped lang="less">
.sub-sort {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    a {
      height: 30px;
      line-height: 28px;
      border: 1px solid #e4e4e4;
      padding: 0 20px;
      margin-right: 20px;
      color: #999;
      border-radius: 2px;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @xtxColor;
        border-color: @xtxColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 3px;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @xtxColor;
          }
        }
        &.down {
          top: 15px;
          border-top-color: #bbb;
          &.active {
            border-top-color: @xtxColor;
          }
        }
      }
    }
  }
  .check {
    .xtx-checkbox {
      margin-left: 20px;
      color: #999;
    }
  }
}
</style>
