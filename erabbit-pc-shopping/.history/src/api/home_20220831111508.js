// 提供首页相关接口函数
import request from '@/utils/request'
// 获取品牌
// limit表示品牌个数
export const findBrand = (limit) => {
  return request('home/brand', 'get', { limit: 6 })
}
// 获取轮播图
export const findBanner = () => {
  return request('home/banner','get')
}