<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <!-- {{ val }} -->
          <img @click="changeSku(val, item)" :class="{ selected: val.selected, disabled: val.disabled }" v-if="val.picture" :src="val.picture" :title="val.name" alt="" />
          <span @click="changeSku(val, item)" :class="{ selected: val.selected, disabled: val.disabled }" v-else>{{ val.name }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import getPowerSet from '@/vender/power-set'
// 获取一个路劲字典
const spliter = '☆'
const getPathMap = (skus) => {
  // 1.得到所有的sku集合 props.goods.skus
  // 2.从所有的sku中帅选出有效的sku
  // 3.根据有效的sku使用power-set算法的到子集
  // 4.根据子集往路径字典对象中存储 key-value
  const pathMap = {}
  skus.forEach((sku) => {
    if (sku.inventory > 0) {
      // 计算当期有库存的sku的子集
      // 可选择值数组
      const valueArr = sku.specs.map((val) => val.valueName)
      // 可选组值数据子集
      const valueArrPowerSet = getPowerSet(valueArr)
      // console.log(valueArrPowerSet)
      // 遍历子集 往pathMap中插数据
      valueArrPowerSet.forEach((arr) => {
        // 根据arr数组得到字符串key 约定key是：['蓝色','美国'] ===》 蓝色☆美国
        const key = arr.join(spliter)
        // console.log(key)
        // 给pathMap设置数据
        if (pathMap[key]) {
          // 已经有key往数组追加
          pathMap[key].push(sku.id)
        } else {
          // 没有key则设置一个数组
          pathMap[key] = [sku.id]
        }
        // console.log(pathMap)
      })
    }
  })
  return pathMap
}
// 得到当前选中规格集合
const getSelectValues = (specs) => {
  const arr = []
  specs.forEach((item) => {
    // 选中的按钮对象
    const selectedValue = item.values.find((val) => val.selected)
    arr.push(selectedValue ? selectedValue.name : undefined)
  })
  return arr
}
// 更新按钮禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 1.约定每一按钮的状态由本身的disabled数据控制
  specs.forEach((item, i) => {
    // 得到选中按钮数组
    const selectedValues = getSelectValues(specs)
    // console.log(selectedValues)
    item.values.forEach((val) => {
      // 2.判断当前是否选中，是选中不用判断
      if (val.selected) return
      // 3.拿着当时的值按照顺序套入选中的值数组
      // 得到没有选中的按钮数组 来判断是否禁用
      selectedValues[i] = val.name
      // console.log(selectedValues)
      // 4.剔除undefined数据 按照分隔符拼接key
      const key = selectedValues.filter((value) => value).join(spliter)
      // 5.拿着key去路径字典中查找是否有数据 有可以点击，没有就禁用（true）
      val.disabled = !pathMap[key]
    })
  })
}
// 默认选中(激活)
const initDefaultSelected = (goods, skuId) => {
  // 1.找出sku的信息
  // 2.遍历每一个按钮 按钮的值和sku记录的值相同就选中
  const sku = goods.skus.find((sku) => sku.id === skuId)
  goods.specs.forEach((item, i) => {
    const val = item.values.find((val) => val.name === sku.specs[i].valueName)
    val.selected = true
  })
}
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({})
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup(props, { emit }) {
    const pathMap = getPathMap(props.goods.skus)
    // 根据传入的skuId默认选中规格按钮
    if (props.skuId) {
      initDefaultSelected(props.goods, props.skuId)
    }
    // 组件初始化需要更新按钮禁用的状态
    updateDisabledStatus(props.goods.specs, pathMap)
    // 1.选中与取消选中 约定在每个按钮拥有自己的选中状态数据：selected
    // 1.1 点击的是已选中，只需要取消当前选中
    // 1.2 点击的是未选中，把同一个规格的按钮改为位选中
    const changeSku = (val, item) => {
      // 当按钮是禁用的阻止程序运行
      if (val.disabled) return false
      // 当按钮不是被禁用程序正常运行
      if (val.selected) {
        val.selected = false
      } else {
        // 一排其余按钮设置为未选中
        item.values.forEach((valItem) => {
          valItem.selected = false
        })
        // 当前按钮设置为选中
        val.selected = true
      }
      // 点击按钮时，更新按钮状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 将你选择的sku信息通知父组件{skuId,price,oldPrice,inventory,specsText}
      // 1. 选择完整的sku组合按钮，才可以拿到这些信息，提交父组件
      // 2. 不是完整的sku组合按钮，提交空对象父组件
      const validSelectedValues = getSelectValues(props.goods.specs).filter((v) => v)
      if (validSelectedValues.length === props.goods.specs.length) {
        // 完整
        // 取出对应的skuId
        const skuId = pathMap[validSelectedValues.join(spliter)]
        const sku = props.goods.skus.find((sku) => sku.id === skuId[0])
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          // 属性名： 属性值  属性名1：属性值1 .....这样的字符串
          specsText: sku.specs.reduce((p, c) => `${p} ${c.name}：${c.valueName}`, '').trim()
        })
      } else {
        // 不完整
        emit('change', {})
      }
    }
    return { changeSku, pathMap }
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
