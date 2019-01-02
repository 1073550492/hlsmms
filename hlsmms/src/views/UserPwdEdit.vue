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
            <h2>密码修改</h2>
             <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="/pwdedit"><router-link to="/pwdedit">修改密码</router-link></el-menu-item>
              <el-menu-item index="/useradd"><router-link to="/useradd">添加账号</router-link></el-menu-item>
              <el-menu-item index="/userlist"><router-link to="/userlist">账号管理</router-link></el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <el-form  :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="原密码" prop="oldpass">
                <el-input type="password" v-model="ruleForm2.oldpass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="passclick">
                <el-input type="password" v-model="ruleForm2.passclick" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
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
    //验证再次确认密码
    var validatePass2 = (rule, value, callback) => {
        if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
       activeIndex: '1',
        activeIndex2: '1',
      // 数据
      ruleForm2: {
        pass: "",
        oldpass: "",
        passclick: "",
      },
      //表单验证
      rules2: {
        oldpass: [
          { required: true, message: "原密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "原密码长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "新密码长度在 6 到 16 个字符",
            trigger: "blur"
          }
        ],
        passclick: [
          { required: true, message: "确认新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "确认新密码长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: 'blur' }
        ],
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
          console.log("error submit!!");
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

.el-button{
    padding: 8px 12px;
    background-color: #6aae00 !important;
}
</style>
