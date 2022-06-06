import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard'),
      meta: { title: '首页', icon: 'el-icon-s-home' }
    }]
  },


  {
    path: '/',
    component: Layout,
    redirect: '/table',
    children: [{
      path: 'table',
      name: 'table',
      component: () => import('@/views/table'),
      meta: { title: 'table组件', icon: 'el-icon-s-home' }
    }]
  },

  {
    path: '/article',
    component: Layout,
    redirect: '/blog/article',
    name: 'Article',
    meta: { title: '博客管理', icon: 'el-icon-notebook-2' },
    children: [
      {
        path: 'article',
        name: 'Article',
        component: () => import('@/views/article'),
        meta: { title: '文章管理', icon: 'el-icon-notebook-1' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/category'),
        meta: { title: '分类管理', icon: 'el-icon-s-order' }
      },
      {
        path: 'label',
        name: 'Label',
        component: () => import('@/views/label'),
        meta: { title: '标签管理', icon: 'el-icon-collection-tag' }
      }
    ]
  },

  {
    path: '/advert',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Advert',
        component: () => import('@/views/advert'),
        meta: { title: '广告管理', icon: 'el-icon-picture-outline-round' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/user',
    name: 'System',
    meta: {
      title: '系统管理',
      icon: "el-icon-setting"
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/user'), // Parent router-view
        name: 'User',
        meta: { title: '用户管理', icon : "el-icon-user-solid" },
      },
      {
        path: 'role',
        component: () => import('@/views/role'),
        name: 'Role',
        meta: { title: '角色管理', icon : "el-icon-coin" }
      },
      {
        path: 'menu',
        component: () => import('@/views/menu'),
        name: 'Menu',
        meta: { title: '菜单管理', icon : "el-icon-menu" }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'http://www.usian.cn',
        meta: { title: '积云教育官网', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
