<template>
  <div class="tags-view-container">

    <router-link @contextmenu.native.prevent="openMenu($event, index)" :style="{color : isActive(item) ? '#fff' : '', backgroundColor : isActive(item) ? '#42b983' : '', borderColor :isActive(item) ? '#42b983' : '' }" class="tags-view-item" :class="{active :isActive(item) }" :to="item.path" v-for="(item,index) in tagsViewList" :key="index">
      {{item.meta.title}}
      <i v-if="!(index===0)" class="el-icon-close"  @click.prevent.stop="onCloseClick(index)"/>
    </router-link>

    <ContextMenu v-if="visible" :menuStyle="menuStyle" :index="index"></ContextMenu>

<!--    tagsView:-->
<!--      1. 获取到所点击的菜单数据源-->
<!--      2. 将获取到的菜单数据源保存到vuex和本地 （localstorage, cookie）-->
<!--      3. 在vuex getters 获取state里面保存的菜单数据源-->
<!--      4. 创建tagsView组件-->
<!--      5. 在main区域引入tagsView组件, 注册并使用-->
<!--      6. 在tagsView组件内获取存储在vuex中的数据源-->
<!--      7. 遍历数据源， 实现布局-->
<!--      8. 创建右键菜单组件-->
<!--      9. 在tagsView组件引入,注册并使用-->
<!--     10. 在右键菜单组件里面实现布局以及创建对应的事件方法-->
<!--     11. 点击对应的tags显示右键菜单组件-->

  </div>
</template>

<script>
import ContextMenu from '@/components/TagsView/ContextMenu'
export default {
  name: 'TagsView',
  computed: {
    tagsViewList(){
      return this.$store.getters.tagsView
    }
  },
  data(){
    return {
      visible : false,
      index : 0,
      menuStyle : {
        left : 0,
        top : 0
      }
    }
  },
  watch : {
    /**
     * 当contextmenu 显示的时候， 给body绑定点击事件， 执行关闭contextmenu 的方法
     * 当contextmenu 的时不显示的候， 给body移除绑定点击事件， 以及关闭的contextmenu 的方法
     * @param val
     */
    visible(val){
      if(val){
        document.body.addEventListener("click",this.closeMenu)
      }else{
        document.body.removeEventListener("click",this.closeMenu)
      }
    }
  },
  components : {
    ContextMenu
  },
  methods : {
    onCloseClick(index){
      console.log(index) //
      this.$store.dispatch("tagsView/removeTagsView",{action : "current", index})
      console.log(this.$store.getters.tagsView[index])
      let path = this.$store.getters.tagsView[index] ? this.$store.getters.tagsView[index].path :  this.$store.getters.tagsView[this.$store.getters.tagsView.length - 1].path


      this.$router.push(path)
    },
    openMenu(event,index){
      const { x, y } = event
      this.menuStyle.left = x + 'px'
      this.menuStyle.top = y + 'px'
      this.index= index
      this.visible = true
    },
    closeMenu(){
      this.visible = false
    },
    isActive(tag){
      return tag.path === this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-view-container{
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-item{
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #d8dce5;
    color: #495060;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;

    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      color: #fff;
      &::before {
        content: '';
        background: #fff;
        display: inline-block;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: relative;
        margin-right: 4px;
      }
    }
    // close 按钮
    .el-icon-close {
      width: 16px;
      height: 16px;
      line-height: 10px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
