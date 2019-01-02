<template>
  <el-container id="home">
    <!-- left -->
    <leftMenu></leftMenu>
    <!-- right -->
    <el-container id="mianContnet">
      <!-- rightTop -->
      <rightTop></rightTop>
      <!-- rightContent -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2>商品管理</h2>
             <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">    
              <el-menu-item index="/addgoods"><router-link to="/addgoods">添加商品</router-link></el-menu-item>
              <el-menu-item index="/googdsmanage"><router-link to="/goodsmanage">商品管理</router-link></el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <!-- 内容 -->
          </div>
        </el-card>

      </el-main>
      <!-- rightButtom -->
      <rightButtom></rightButtom>
    </el-container>
  </el-container>
</template>

<script>
//引入leftMenu组件
import LeftMenu from "../components/leftMenu.vue";
import RightTop from "../components/rightTop.vue";
import RightButtom from "../components/rightBottom.vue";

export default {
  data() {
    return {
      activeIndex: '1',
        activeIndex2: '1',
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  },
  methods:{
    handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      }
  }
};
</script>

<style>
</style>

