<template>
  <section class="app-main">
    <TagsView></TagsView>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
import { isTags } from '@/utils/tags'
import TagsView from "@/components/TagsView"
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  },
  components : {
    TagsView
  },
  created() {
    if(isTags(this.$route)) return
    const {meta, path} = this.$route
    this.$store.dispatch('tagsView/setTagsView',{meta, path})
  },
  watch : {
    $route(to,from){
      if(isTags(to.path)) return
      const {meta, path} = to
      this.$store.dispatch('tagsView/setTagsView',{meta, path})
    }
  }
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
