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
            <h2>添加分类</h2>
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">    
              <el-menu-item index="/addclass"><router-link to="/addclass">添加分类</router-link></el-menu-item>
              <el-menu-item index="/classmanage"><router-link to="/classmanage">分类管理</router-link></el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="所属分类：" prop="usergroups">
                <el-select v-model="ruleForm2.usergroups" placeholder="-----顶级分类-----">
                  <el-option label="-----顶级分类-----" value="shanghai"></el-option>
                  <el-option label="-----普通分类-----" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="分类名称：" prop="classname">
                <el-input type="text" v-model="ruleForm2.classname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="状态：">
              <el-radio-group v-model="radio2">
                <el-radio :label="3">启用</el-radio>
                <el-radio :label="6">禁用</el-radio>
              </el-radio-group>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
              </el-form-item>
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
      ruleForm2: {
        classname: "",
        usergroups: ""
      },
      radio2: 3,
      //表单验证
      rules2: {
        classname: [
          { required: true, message: "分类名称不能为空", trigger: "blur" },
          {
            min: 4,
            max: 10,
            message: "分类名称长度在4 到 10 个字符",
            trigger: "blur"
          }
        ],
        usergroups: [
          { required:false, trigger: "change" }
        ]
      }
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  },
   methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          this.$router.push("/");
        } else {
          //console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
  }
};
</script>

<style scoped>
/* 用户添加页面表单宽度 */
.el-button{
    padding: 8px 12px;
    background-color: #6aae00 !important;
}

</style>

