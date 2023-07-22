// 定义分类相关的API接口函数
import request from '@/utils/request'

// 拿到首页头部的所有商品分类
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

// 获取单个顶级分类(chidern属性)
export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}

// 获取二级类目的数据
export const findSubCategoryFilter = (id) => {
  return request('/category/sub/filter', 'get', { id })
}

// 获取二级分类下的商品
export const findSubCategoryGoods = (params) => {
  return request('/category/goods', 'post', params)
}
