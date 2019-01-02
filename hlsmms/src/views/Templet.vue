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
            <h2>系统信息</h2>
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="/pwdedit"><router-link to="/pwdedit">修改密码</router-link></el-menu-item>
              <el-menu-item index="/useradd"><router-link to="/useradd">添加账号</router-link></el-menu-item>
              <el-menu-item index="/userlist"><router-link to="/userlist">账号管理</router-link></el-menu-item>
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
      isOpened: true,
      tableData: [
        { goodsname: "海飞丝去屑洗发水", salenum: 8 },
        { goodsname: "茅台酒", salenum: 6 },
        { goodsname: "龙凤呈祥", salenum: 5 },
        { goodsname: "龙凤呈祥2", salenum: 2 }
      ],
      tableDatatwo: [{ tradename: "我的优乐美", stock: 0, operation: "入库" }]
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  },
  methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>

<style>
</style>

