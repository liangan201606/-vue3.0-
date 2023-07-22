// 提供首页相关接口函数
import request from '@/utils/request'
// 获取商品信息 库存价格是否有效（支持本地购物车）
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
// 获取商品d对应的sku信息
export const getSpecsAndSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}
// 合并购物车  cartList - 本地购物车数组
export const mergeCart = (cartList) => {
  return request('/member/cart/merge', 'post', cartList)
}
// 获取购物车列表登录后
export const findCartList = () => {
  return request('/member/cart', 'get')
}
// 登录后加入购物车
export const insertCart = ({ skuId, count }) => {
  return request('/member/cart', 'post', { skuId, count })
}
// 登录后删除商品 ids - skuId集合
export const deleteCart = (ids) => {
  return request('/member/cart', 'delete', { ids })
}
// 登录后修改商品数量
export const updateCart = ({ selc}) => {
  return request('/member/cart/' + goods.skuId, 'put', goods)
}
