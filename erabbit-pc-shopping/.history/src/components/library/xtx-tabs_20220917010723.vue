<!-- 切换选项卡组件 -->
<script>
import { useVModel } from '@vueuse/core'
import { provide } from 'vue'
export default {
  name: 'XtxTabs',
  render() {
    // 获取插槽内容节点
    const panels = this.$slots.default()
    // 获取动态的panels数组集合
    const dynamicPanels = []
    console.log(panels)
    // 需要在这里进行组织
    // 1.tabs组件大容器
    // 2.选项卡的导航菜单结构
    // 3.内容容器
    const nav = (
      <nav>
        {panels.map((item, i) => {
          // 动态判断节点类型，组织tabs列表
          return <a href="javascript:;">{item.props.label}</a>
        })}
      </nav>
    )
    return <div class="xtx-tabs">{[nav, panels]}</div>
  }
}
</script>
<style lang="less" scoped>
.xtx-tabs {
  background: #fff;
  > nav {
    height: 60px;
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    > a {
      width: 110px;
      border-right: 1px solid #f5f5f5;
      text-align: center;
      font-size: 16px;
      &.active {
        border-top: 2px solid @xtxColor;
        height: 60px;
        background: #fff;
        line-height: 56px;
      }
    }
  }
}
</style>
