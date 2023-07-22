// 提供首页相关接口函数
import request from '@/utils/request'

// 获取商品信息
export const findGoods = (id) => {
  return request('/goods', 'get', { id })
}
// 获取商品推荐
export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}
