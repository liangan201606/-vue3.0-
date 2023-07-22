<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle()" :class="{ active: visible }">
      <span class="placeholder" v-if="!fullLocation">请选择配送地址</span>
      <span class="value" v-else>{{ fullLocation }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <div class="loading" v-if="loading"></div>
      <template v-else>
        <span class="ellipsis" v-for="item in currList" :key="item.code" @click="changeItem(item)">{{ item.name }}</span>
      </template>
    </div>
  </div>
</template>
<script>
import { ref, computed, reactive } from 'vue'
import { onClickOutside } from '@vueuse/core'
import axios from 'axios'
export default {
  name: 'XtxCity',
  props: {
    fullLocation: {
      type: String,
      default: ''
    }
  },
  setup() {
    // 显示隐藏
    const visible = ref(false)
    // 所有省市区数据
    const allCityData = ref([])
    // 是否正在加载
    const loading = ref(false)
    // 提供打开和关闭的行为方法
    const open = () => {
      visible.value = true
      getCityData().then((data) => {
        allCityData.value = data
        loading.value = false
      })
    }
    const close = () => {
      visible.value = false
    }
    // 提供一个切换函数给selcet使用
    const toggle = () => {
      visible.value ? close() : open()
    }
    // 点击其他位置隐藏
    const target = ref(null)
    onClickOutside(target, () => {
      close()
    })

    // 实现一个计算属性：获取当前显示的地区数组
    const currList = computed(() => {
      // 默认省一级
      const list = allCityData.value
      // 市一级
      if (changeResult.cityCode) {
        list = list.find((item) => item.code === changeResult.cityCode).areaList
      }
      // 区县一级
      return list
    })

    // 定义选择的 省市区 数据
    const changeResult = reactive({
      provinceCode: '',
      provinceName: '',
      cityCode: '',
      cityName: '',
      countryCode: '',
      countryName: '',
      fullLocation: ''
    })
    // 点击地区按钮时记录
    const changeItem = (item) => {
      // 省级
      if (item.level === 0) {
        changeResult.provinceCode = item.code
        changeResult.provinceName = item.name
      }
      if (item.level === 1) {
        changeResult.cityCode = item.code
        changeResult.cityName = item.name
      }
      if (item.level === 2) {
        changeResult.countryCode = item.code
        changeResult.countryName = item.name
      }
    }
    return { toggle, visible, target, loading, currList, changeItem }
  }
}
// 获取城市数据
// 1. 数据在哪里？https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json
// 2. 何时获取？打开城市列表的时候，做个内存中缓存
// 3. 怎么使用数据？定义计算属性，根据点击的省份城市展示
// 获取省市区数据函数
const getCityData = () => {
  // 1.当本地没有缓存，发请求数据
  // 2.当本地有缓存，取出本地数据
  // 这个位置可能有异常操作，封装成promise 在then获取数据
  return new Promise((resolve, reject) => {
    //  约定：数据存储在window上的cityData字段上
    if (window.cityData) {
      resolve(window.cityData)
    } else {
      const url = 'https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json'
      axios.get(url).then((res) => {
        window.cityData = res.data
        resolve(window.cityData)
      })
    }
  })
}
</script>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
