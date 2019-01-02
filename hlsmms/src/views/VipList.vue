<template>
  <el-container id="home" class="viplist">
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
            <h2>账号管理</h2>
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="/addvip">
                <router-link to="/addvip">添加账号</router-link>
              </el-menu-item>
              <el-menu-item index="/viplist">
                <router-link to="/viplist">账号管理</router-link>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="搜索:">
                <el-input v-model="formInline.user" class="seach"></el-input>
              </el-form-item>
              <el-form-item label="会员卡，会员名，电话，手机" class="seachlabel">
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" class="selvip">查询</el-button>
              </el-form-item>
            </el-form>
            <div class="boderdiv"></div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="cardnum" label="会员名卡号" width="180"></el-table-column>
              <el-table-column prop="name" label="会员姓名" width="180"></el-table-column>
              <el-table-column prop="level" label="会员等级"></el-table-column>
              <el-table-column prop="integral" label="会员积分"></el-table-column>
              <el-table-column prop="phone" label="手机号"></el-table-column>
              <el-table-column prop="landline" label="座机号"></el-table-column>
              <el-table-column prop="address" label="管理">
                 <template slot-scope="scope">
                   <i class="el-icon-edit"></i>
                </template>
              </el-table-column> 
            </el-table>
            <pagenum></pagenum>
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
import pagenum from "../components/pagenum.vue";

export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      formInline: {
        user: "",
        region: ""
      },
      tableData: [{
            cardnum:"2222222",
            name:"舅舅",
            level:"普通会员",
            integral:"0",
            phone:"1234698799",
            landline:"698574",
            // address:"",
          }, {
            cardnum:"2222222",
            name:"舅舅",
            level:"普通会员",
            integral:"0",
            phone:"1234698799",
            landline:"698574",
            // address:"",
          }, {
            cardnum:"2222222",
            name:"舅舅",
            level:"普通会员",
            integral:"0",
            phone:"1234698799",
            landline:"698574",
            // address:"",
          }, {
           cardnum:"2222222",
            name:"舅舅",
            level:"普通会员",
            integral:"0",
            phone:"1234698799",
            landline:"698574",
            // address:"",
          }]
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom,
    pagenum
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    onSubmit() {
      //console.log('submit!');
    }
  }
};
</script>

<style>
.el-form-item .el-form-item__label {
  line-height: 38px !important;
}
.viplist .seach {
  width: 100% !important;
}
.viplist .seach .el-input__inner {
  height: 30px;
}
.viplist .el-form-item__content {
  width: 170px;
}
.viplist .seachlabel {
  width: 200px;
}
.viplist .boderdiv {
  width: 100%;
  height: 2px;
  border: 1px solid #ccc;
}
.selvip{
  background-color: #6aae00 !important;
}
</style>

