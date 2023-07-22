// 提供首页相关接口函数
import request from '@/utils/request'

// 获取商品推荐  id=商品ID
export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}
// 获取热搜榜单
// type - 1代表24小时热销榜 2代表周热销榜 3代表总热销榜
export const findHotGoods = ({ id, type, limit = 3 }) => {
  return request('/goods/hot', 'get', { id, type, limit })
}
// 获取商品评价
export const findCommentInfoByGoods = (id) => {
  return request(`/goods/${id}/evaluate`, 'get')
  // return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`)
  // axios 遇见 http https 开头的地址，不会加上基准地址
  // return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')
}
export const findGoodsCommentList = (id, params) => {
  return request(`/goods/:id/evaluate`)
  // return request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', params)
}
