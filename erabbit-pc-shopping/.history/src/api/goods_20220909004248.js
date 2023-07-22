// 提供首页相关接口函数
import request from '@/utils/request'

// 获取商品推荐  id=商品ID
export const findRelGoods = (id, limit = 16) => {
  return request('/goods/relevant', 'get', { id, limit })
}
