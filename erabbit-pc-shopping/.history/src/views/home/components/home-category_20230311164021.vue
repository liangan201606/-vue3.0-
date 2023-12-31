<template>
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id" @mouseenter="categoryId = item.id" :class="{ active: categoryId === item.id }">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <RouterLink v-for="sub in item.children" :key="sub.id" :to="`/category/sub/${sub.id}`">{{ sub.name }}</RouterLink>
        </template>
        <!-- 骨架 -->
        <span v-else>
          <XtxSkeleton width="60px" height="18px" style="margin-right: 5px" bg="rgba(255,255,255,0.2)" />
          <XtxSkeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)" />
        </span>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4 v-if="currentCategory">{{ currentCategory.id === 'brand' ? '品牌' : '分类' }}推荐 <small>根据您的购买或浏览记录推荐</small></h4>
      <!-- 分类 -->
      <ul v-if="currentCategory && currentCategory.goods && currentCategory.goods.length">
        <li v-for="item in currentCategory.goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-if="currentCategory && currentCategory.brands">
        <li class="brand" v-for="item in currentCategory.brands" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="place"><i class="iconfont icon-dingwei"></i>{{ item.place }}</p>
              <p class="name ellipsis">{{ item.nameEn }}</p>
              <p class="desc ellipsis-2">{{ item.name }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { findBrand } from '@/api/home'
export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore()
    // 最终使用的数据 = 九个分类和一个品牌
    // 品牌的数据类型应该是响应式的
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children' }, { name: '品牌推荐' }],
      brands: []
    })
    const menuList = computed(() => {
      // 获取九个分类且每个一级分类只有两个子分类
      const list = store.state.category.list.map((item) => {
        // console.log(item)
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        }
      })
      list.push(brand)
      return list
    })
    // 得到弹出层的推荐商品信息
    const categoryId = ref(null)
    const currentCategory = computed(() => {
      // 获取到对应分类的数据
      return menuList.value.find((item) => item.id === categoryId.value)
    })
    console.log(currentCategory);
    console.log(categoryId.value)

    // 获取品牌数据，响应式
    // 尽量不要在setup上async
    findBrand(6).then((data) => {
      brand.brands = data.result
    })
    return { menuList, categoryId, currentCategory }
  }
}
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      // 处理左侧分类激活显示
      &:hover,
      &.active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
    // 骨架动画
    .xtx-skeleton {
      animation: fade 1s linear infinite alternate;
    }
    @keyframes fade {
      from {
        opacity: 0.2;
      }
      to {
        opacity: 1;
      }
    }
  }
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      // 品牌样式
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
