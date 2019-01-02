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
            <h2>账号管理</h2>
            <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="/pwdedit">
                <router-link to="/pwdedit">修改密码</router-link>
              </el-menu-item>
              <el-menu-item index="/useradd">
                <router-link to="/useradd">添加账号</router-link>
              </el-menu-item>
              <el-menu-item index="/userlist">
                <router-link to="/userlist">账号管理</router-link>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%">
              <!-- 编号 -->
              <el-table-column label="编号" width="180">
                <template slot-scope="scope">
                  {{ scope.row.userid }}
                </template>
              </el-table-column>

              <!-- 账号 -->
              <el-table-column label="账号" width="180">
                <template slot-scope="scope">
                  {{ scope.row.username }}
                </template>
              </el-table-column>

              <!-- 日期 -->
              <el-table-column label="添加日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.addDate | foramtData }}</span>
                </template>
              </el-table-column>

              <!-- 用户组 -->
              <el-table-column label="用户组" width="180">
                <template slot-scope="scope">
                  {{ scope.row.usergroup }}
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.row.userid)">
                    <i class="el-icon-edit"></i> 编辑</el-button>
                  <el-button class="listbtn" size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                    <i class="el-icon-delete"></i> 删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>

      </el-main>
      <!-- rightButtom -->
      <rightButtom></rightButtom>
    </el-container>
    <!-- 修改用户资料的对话框 -->
      <el-dialog
        title="修改用户资料"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose" id="mydailog">
        <el-form
              :model="ruleForm2"
              status-icon
              :rules="rules2"
              ref="ruleForm2"
              label-width="100px"
              class="demo-ruleForm"
              label-position="right"
            >
              <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="密码" prop="userpwd">
                <el-input type="text" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item label="用户组" prop="usergroup">
                <el-select v-model="ruleForm2.usergroup" placeholder="请选择">
                  <el-option label="超级管理员" value="超级管理员"></el-option>
                  <el-option label="普通管理员" value="普通管理员"></el-option>
                </el-select>
              </el-form-item>

              <!-- <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
              </el-form-item> -->
            </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm2')" class="okbtn">确定修改</el-button>
        </span>
      </el-dialog>
  </el-container>
</template>

<script>
//引入leftMenu组件
import LeftMenu from "../components/leftMenu.vue";
import RightTop from "../components/rightTop.vue";
import RightButtom from "../components/rightBottom.vue";
//引入moment组件
import moment from "moment";
export default {
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1",
      /* {
          userid
          username
          userpwd
          usergroup
          addDate
      } */
      tableData: [],
      dialogVisible: false, //控制对话框的显示true和隐藏false
         //数据对象
      ruleForm2: {
        userpwd: "",
        username: "",
        usergroup: '',
        userid: 0
      },
      //验证规则
      rules2: {
        username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        userpwd: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
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
    //提交表单的方法
    submitForm(formName){
        //调用组件的验证方法提交表单验证】
        this.$refs[formName].validate(valid=>{
          //valid参数表示验证的结果，true表示验证通过，false验证失败
          if(valid){
            //发送ajax请求去后端做数据库添加用户
            //获取用户数据
            console.log(this.ruleForm2);
            //收集新数据并发起ajax到后端
            this.axios.post("http://127.0.0.1:9090/users/usersave",
            this.qs.stringify(this.ruleForm2)
            ).then(result=>{
              if(result.data.isOk){
                this.$message({
                  message: result.data.msg,
                  type: 'success'
                });
                //修改完关闭对话框
                this.dialogVisible = false;
                //调用获取数据的方法更新数据列表
                this.getusers();
              }else{
                this.$message.error(result.data.msg);
              }
            }).catch(err=>{
              this.$message.error('错了哦'+err.message);
            })
          }else{
            //alert("× 表单验证失败！")；
            return false;
          }
        });
    },
    getusers() {
      this.axios
        .get("http://127.0.0.1:9090/users/getusers")
        .then(result => {
          console.log("后端返回的数据", result.data);
          this.tableData = result.data;
        })
        .catch(err => {
          console.log(err.message);
        });
    },
    handleEdit(userid) {
      //通过绑定的点击事件，获取要编辑用户的id
      console.log("要编辑用户的id",userid);
      //前端发送ajax请求到后台获取旧数据
      this.axios.get("http://127.0.0.1:9090/users/getuserbyid?userid=" + userid)
      .then((result)=>{
        //前端把旧数据回填到表单中
        this.ruleForm2=result.data[0];
        //模态框
        this.dialogVisible=true;  //显示对话框
      }).catch((err)=>{
        this.$message.error("错了哦", err.message);
      })
    },
    handleDelete(userid) {
      //查询要删除的userid
      console.log("要删除的id" + userid);
      //发送aiax请求到后端
      this.axios
        .get("http://127.0.0.1:9090/users/deluser?userid=" + userid)
        .then(result => {
          console.log("后端返回的数据", result);
          //根据后端返回的数据结果进行判断
          result = result.data;
          if (result.isOk) {
            this.$message({
              message: result.msg,
              type: "success"
            });
            this.getusers();
          } else {
            this.$message.error("错了哦", result.msg);
          }
        })
        .catch(err => {
          this.$message.error("错了哦", err.message);
        });
    },
       //关闭对话框的确认方法
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
   },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  //组件实例化之后执行的钩子
  created() {
    this.getusers();
  },
  filters: {
    foramtData(oldData) {
      return moment(oldData).format("YYYY年MM月DD日");
    }
  }
};
</script>

<style>
.el-button {
  padding: 8px 12px;
  background-color: #ccc !important;
}
.listbtn {
  background-color: rgb(247, 33, 33) !important;
}
.okbtn{
  background-color: #ccc !important;
}

</style>

