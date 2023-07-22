<!-- 切换选项卡组件 -->
<script>
export default {
  name: 'XtxTabs',
  render() {
    // 需要在这里进行组织
    // 1.tabs组件大容器
    // 2.选项卡的导航菜单结构
    // 3.内容容器
    const nav = <nav>
        <a herf="javascript">选项1</a>
        <a herf="javascript">选项2</a>
        <a herf="javascript">选项3</a>
      </nav>
    const content = <div>
        <div>内容1</div>
        <div>内容1</div>
      </div>
    return <div class='xtx-tabs'></div>
  }
}
</script>
<style lang="less" scoped></style>
