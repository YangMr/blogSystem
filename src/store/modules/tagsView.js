/**
 * @author YangLing
 * @date 2022/6/1 3:56 PM
 */
import Cookies from 'js-cookie'

const state = {
  // 获取cookie里面存储到tagsView 数据源 ， 如果本地没有，则为空数组 ，   做vuex数据持久化
  tagsView : Cookies.get("tagsView") ? JSON.parse(Cookies.get("tagsView")) : []
}

const mutations = {
  /**
   * 将tagsview的数据源 通过commit 来保存到 state中
   * @param state
   * @param tagsView
   * @constructor
   */
  SET_TAGS_VIEW:(state, tagsView) => {
    // 当点击左侧菜单的时候， 要将所点击的数据存储到 state里面的tagsView ， 但是 如果tagsView 里面已经有了我们要添加的数据，这个时候
    // 我们就不再需要进行添加了 如果 state里面的tagsView  没有我们要添加的数据， 我们才可以添加
    const isFind = state.tagsView.find(item=>{
      return item.path === tagsView.path
    })
    if(!isFind){
      state.tagsView.push(tagsView)
      Cookies.set("tagsView",state.tagsView)
    }
  }
}

const actions = {
  /**
   * 在actions内调用mutations里面定义的方法
   * @param commit
   */
  setTagsView({commit},payload){
    console.log("payload=>",payload)
    commit('SET_TAGS_VIEW',payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
