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
            <h2>添加商品</h2>
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">    
              <el-menu-item index="/addgoods"><router-link to="/addgoods">添加商品</router-link></el-menu-item>
              <el-menu-item index="/googdsmanage"><router-link to="/goodsmanage">商品管理</router-link></el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="所属分类" prop="usergroups">
                <el-select v-model="ruleForm2.usergroups" placeholder="-----选择分类-----">
                  <el-option label="顶级分类" value="shanghai"></el-option>
                  <el-option label="普通分类" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>
              <!-- <el-button type="success">成功按钮</el-button> -->
            </el-form>
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
      // 数据
      ruleForm2: {
        usergroups: "",
        username:"",
      },
      //表单验证
      rules2: {
        usergroups: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
      }
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  },
  // methods: {
  //   submitForm(formName) {
  //     this.$refs[formName].validate(valid => {
  //       if (valid) {
  //         // alert("submit!");
  //         this.$router.push("/");
  //       } else {
  //         //console.log("error submit!!");
  //         return false;
  //       }
  //     });
  //   },
  //   resetForm(formName) {
  //     this.$refs[formName].resetFields();
  //   }
  // }
  methods:{
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>

<style>
</style>

