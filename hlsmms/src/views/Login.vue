<template>
  <div id="loginbox">
    <el-card class="box-card" id="login">
      <div slot="header" class="clearfix">
        <h2>用户登录</h2>
      </div>
      <div class="text item">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="userpwd">
            <el-input type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')" class="delubtn">登陆</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 数据
      ruleForm2: {
        userpwd: "",
        username: ""
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
        userpwd: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码长度在 6 到 16 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
       methods: {
      //提交表单的方法
      submitForm(formName) {
        //调用组件的验证方法提交表单是验证  
        this.$refs[formName].validate((valid) => {
          //valid参数表示验证的结果，true表示验证通过，false验证失败
          if (valid) {
            //alert('√ 表单验证成功!');
            //发起ajax请求去后端做数据库的验证
            //location.href="/";
            /* 1）前端——完成表单验证后直接发起ajax请求到后端 http://172.16.4.254:8080/#/login 
            合法： 写入cookie，返回成功true标识，   非法：不写cookie，返回失败false标识
            4）前端——根据返回的结果提示登录成功还是失败
            登录成就跳转到管理中心首页，登录失败不跳转 */

            //************************ 让ajax携带cookie证书********************************
            this.axios.defaults.withCredentials=true;

            let reqUrl="http://127.0.0.1:9090/users/checkLogin"; //后端的api地址
            this.axios.post(
              reqUrl,
              this.qs.stringify(this.ruleForm2)
            ).then(result=>{
               if(result.data.isOk){
                  //登录成功
                   this.$message({
                      message: '恭喜你，'+result.data.msg,
                      type: 'success'
                   });
                   this.$router.push("/"); //使用路由对象的push实现跳转
               }
               else{
                 //登录失败
                 this.$message.error(result.data.msg);
               }
            }).catch(err=>{
               this.$message.error('错了哦'+err.message);
            });
          } else {
            alert('× 表单验证失败!');
            return false;
          }
        });
      },
      //重置表单的方法
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
};
</script>

<style>
#loginbox {
  background: #6bcece;
  position: fixed;
  height: 100%;
  width: 100%;
}

#login {
  width: 530px;
  height: 300px;
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: auto;
}
.el-card__header {
  padding: 24px 20px !important;
  line-height: 5px !important;
}
.el-button--primary {
  background-color: #ccc !important;
  border-color: #ccc !important;
}
.el-input__inner {
  margin-bottom: 15px !important;
}
.el-input {
  width: 80% !important;
}
.el-radio__inner {
  border: 1px solid rgb(139, 139, 139) !important;
}
.el-button + .el-button {
  background: #fff;
}
.el-form-item__error {
  top: 84% !important;
}
/* .el-button{
    padding: 8px 12px;
    background-color: #fff !important;
} */
.delubtn {
  background-color: #ccc;
}
</style>
