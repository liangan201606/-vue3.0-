// 提供首页相关接口函数
import request from '@/utils/request'
export const getNewCartGoods = (skuId) => {
  return request(`/goods/stock/${skuId}`, 'get')
}