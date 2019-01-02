import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
//引入Longin路由
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, 
    {
      path: '/login',
      name: 'login',
      component:Login
    },
    // 账号管理部分路由
    {
      path:'/userlist',
      component:()=>import(/*webpackChunkName:"UserList"*/'./views/UserList.vue')
    },
    {
      path:'/useradd',
      component:()=>import(/*webpackChunkName:"UserAdd"*/'./views/UserAdd.vue')
    },
    {
      path:'/pwdedit',
      component:()=>import(/*webpackChunkName:"PwdEdit"*/'./views/UserPwdEdit.vue')
    },
    // 分类管理部分路由
    {
      path:'/addclass',
      component:()=>import(/*webpackChunkName:"AddClass"*/'./views/AddClass.vue')
    },
    {
      path:'/classmanage',
      component:()=>import(/*webpackChunkName:"ClassManage"*/'./views/ClassManage.vue')
    },
    //商品管理部分路由
    {
      path:'/goodsmanage',
      component:()=>import(/*webpackChunkName:"GoodsManage"*/'./views/GoodsManage.vue')
    },
    {
      path:'/addgoods',
      component:()=>import(/*webpackChunkName:"AddGoods"*/'./views/AddGoods.vue')
    },
    //会员管理部分路由
    {
      path:'/viplist',
      component:()=>import(/*webpackChunkName:"AddGoods"*/'./views/VipList.vue')
    },
    {
      path:'/addvip',
      component:()=>import(/*webpackChunkName:"AddGoods"*/'./views/AddVip.vue')
    }
  ]
})
