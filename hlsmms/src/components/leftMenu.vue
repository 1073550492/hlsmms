<template>
    <el-aside width="230px" id="navmenu">
     <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true">

      <div id="leftTitle">
        <h1>华联超市管理系统</h1>
        <p>您好,admin</p>
        <span><router-link to="/">管理首页</router-link> | <a href="#" @click="loginOut()">退出系统</a></span>
      </div>

      <el-submenu index="1">
        <template slot="title">
          <span>分类管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/classmanage"><router-link to='/classmanage'>分类管理</router-link></el-menu-item>
          <el-menu-item index="/addclass"><router-link to='/addclass'>添加分类</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>商品管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/goodsmanage"><router-link to='/goodsmanage'>商品管理</router-link></el-menu-item>
          <el-menu-item index="/addgoods"><router-link to='/addgoods'>添加商品</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>进货管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">库存管理</el-menu-item>
          <el-menu-item index="1-2">添加库存</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>出货管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">销售列表</el-menu-item>
          <el-menu-item index="1-2">商品出库</el-menu-item>
          <el-menu-item index="1-3">商品退货</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <span>统计管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">销售统计</el-menu-item>
          <el-menu-item index="1-2">进货统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="6">
        <template slot="title">
          <span>账号管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userlist"><router-link to='/userlist'>账号管理</router-link></el-menu-item>
          <el-menu-item index="/useradd"><router-link to='/useradd'>添加账号</router-link></el-menu-item>
          <el-menu-item index="/pwdedit"><router-link to='/pwdedit'>密码修改</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="7">
        <template slot="title">
          <span>会员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/viplist"><router-link to='/viplist'>账号管理</router-link></el-menu-item>
          <el-menu-item index="/addvip"><router-link to='/addvip'>添加账号</router-link></el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="8">
        <template slot="title">
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1">系统信息</el-menu-item>
          <el-menu-item index="1-2">系统配置</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
          <el-menu-item index="1-4">添加管理组</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
  </el-aside>
</template>

<script>
export default {
    methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    loginOut(){
      //发起ajax到后端路由去执行清除cookie的操作
      this.axios.get("http://127.0.0.1:9090/users/loginOut").then(result=>{
        if(result.data.isOk){
          this.$message({
            message: '退出成功！ 欢迎下次登录!',
            type: 'success'
          });
          this.$router.push("/login")
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>

<style>

</style>
