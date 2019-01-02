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
            <h2>添加账号</h2>
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="/pwdedit"><router-link to="/pwdedit">修改密码</router-link></el-menu-item>
              <el-menu-item index="/useradd"><router-link to="/useradd">添加账号</router-link></el-menu-item>
              <el-menu-item index="/userlist"><router-link to="/userlist">账号管理</router-link></el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <el-form  :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="passclick">
                <el-input type="password" v-model="ruleForm2.passclick" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="选择用户组" prop="usergroups">
                <el-select v-model="ruleForm2.usergroups" placeholder="请选择用户组">
                  <el-option label="超级管理用户" value="超级管理用户"></el-option>
                  <el-option label="普通管理用户" value="普通管理用户"></el-option>
                </el-select>
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
        username: "",
        passclick: "",
        usergroups:""
      },
      //表单验证
      rules2: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur"
          }
        ],
        passclick: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "确认密码长度在 6 到 16 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: 'blur' }
        ],
        usergroups: [
            { required: true, message: '请选择用户组', trigger: 'change' }
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
          //发起ajax请求去后端做数据库添加用户
          //获取用户数据
          console.log(this.ruleForm2);
          //使用axios发送请求到后端
          this.axios.post("http://127.0.0.1:9090/users/useradd",
          this.qs.stringify(this.ruleForm2)
          ).then(result=>{
            console.log("服务器成功返回的结果",result)
            //根据返回的结果处理业务逻辑
            if(result.data.isOk){
              //添加成功
              this.$message({
                message: result.data.msg,
                type: 'success'
              });
              setTimeout(()=>{
                this.$router.push("/userlist");
              },100);
            }else{
              //添加失败
              this.$message.error(result.data.msg);
            }
          }).catch(err=>{
            console.log("服务器错误返回的信息",err)
          });
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
/* 用户添加页面表单宽度 */
.el-button{
    padding: 8px 12px;
    background-color: #6aae00 !important;
}
</style>

