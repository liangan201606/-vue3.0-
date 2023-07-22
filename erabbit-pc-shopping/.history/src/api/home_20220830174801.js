// 提供首页相关接口函数
import request from '@/utils/request'
// 获取品牌
// lim
export const findBrand = (limit) => {
  return request('home/brand', 'get', { limit })
}
