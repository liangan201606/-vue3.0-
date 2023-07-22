// 提供首页相关接口函数
import request from '@/utils/request'
// 获取商品信息 库存价格是否有效（支持本地购物车）
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}
// 获取商品d信息
export const getSpecsAndSkus = (skuId) => {
  return request(`/goods/sku/${skuId}`, 'get')
}
