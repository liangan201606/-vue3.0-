// 提供首页相关接口函数
import request from '@/utils/request'
// 获取品牌
// limit表示品牌个数
export const findBrand = (limit) => {
  return request('home/brand', 'get', { limit })
}
// 获取轮播图
export const findBanner = () => {
  return request('home/banner', 'get')
}
// 获取新鲜好物
export const findNew = () => {
  return request('home/new', 'get')
}
// 获取人气推荐
export const findHot = () => {
  return request('home/hot', 'get')
}
// 获取首页产品
export const findProduct = () => {
  return 
}
