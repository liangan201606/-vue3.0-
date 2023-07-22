<!-- 切换选项卡组件 -->
<script>
export default {
  name: 'XtxTabs',
  render() {
    // 获取插槽内容
    const items = this.$slots.default()
    // 需要在这里进行组织
    // 1.tabs组件大容器
    // 2.选项卡的导航菜单结构
    // 3.内容容器
    const nav = (
      <nav>
        <a herf="javascript">选项1</a>
        <a herf="javascript">选项2</a>
        <a herf="javascript">选项3</a>
      </nav>
    )
    const content = (
      <div>
        <div>内容1</div>
        <div>内容2</div>
        <div>内容3</div>
      </div>
    )
    return <div class="xtx-tabs">{[nav, content]}</div>
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
