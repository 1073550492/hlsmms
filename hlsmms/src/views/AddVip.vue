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
            <h2>添加编辑账号</h2>
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
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="left">
              <el-form-item label="真实名字：" prop="realname">
                <el-input type="text" v-model="ruleForm2.realname" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="会员卡号：" prop="vipcard">
                <el-input type="text" v-model="ruleForm2.vipcard" autocomplete="off"></el-input>
              </el-form-item>
          
              <el-form-item label="用户组：" prop="usergroups">
                <el-select v-model="ruleForm2.usergroups" placeholder="普通会员-99%">
                  <el-option label="普通会员-99%" value="shanghai"></el-option>
                  <el-option label="超级会员-100%" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="身份证号：" prop="idcard">
                <el-input type="text" v-model="ruleForm2.idcard" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="用户状态：">
                <el-radio-group v-model="radio2">
                  <el-radio :label="3">启用</el-radio>
                  <el-radio :label="6">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="手机号码：" prop="phone">
                <el-input type="text" v-model="ruleForm2.phone" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="座机号码：" prop="tel">
                <el-input type="text" v-model="ruleForm2.tel" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱地址：" prop="emailaddress">
                <el-input type="text" v-model="ruleForm2.emailaddress" autocomplete="off"></el-input>
              </el-form-item>
              
              <span>地区选择：</span>
              <el-select v-model="value11" multiple collapse-tags style="margin-left: 30px;" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="value11" multiple collapse-tags  placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>

              <el-form-item label="详细地址：" prop="dataaddress">
                <el-input type="text" v-model="ruleForm2.dataaddress" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮政编码：" prop="zipcode">
                <el-input type="text" v-model="ruleForm2.zipcode" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')" class="btnvip">添加</el-button>
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
       value5: [],
        value11: [],
      radio2: 3,
      activeIndex: "1",
      activeIndex2: "1",
      ruleForm2: {
        realname: "",
        vipcard: "",
        usergroups: "",
        idcard: "",
        phone: "",
        tel: "",
        emailaddress: "",
        dataaddress: "",
        zipcode: ""
      },
      options: [{
          value: '选项1',
          label: '黄金糕'
        }],
      rules2: {
        realname: [
          { required: true, message: "真实姓名不能为空", trigger: "blur" },
          {
            min: 2,
            max: 8,
            message: "真实姓名长度在 2 到 8 个字符",
            trigger: "blur"
          }
        ],
        vipcard: [
          { required: true, message: "会员卡号不能为空", trigger: "blur" },
          {
            min: 6,
            max: 14,
            message: "会员卡号长度在 6 到 14 个字符",
            trigger: "blur"
          }
        ],
        usergroups: [
          { required: true, message: "请选择用户组", trigger: "change" }
        ],
        region: [{ required: false, trigger: "change" }],
        idcard: [{ required: false, trigger: "blur" }],
        phone: [{ required: false, trigger: "blur" }],
        tel: [{ required: false, trigger: "blur" }],
        emailaddress: [{ required: false, trigger: "blur" }],
        dataaddress: [{ required: false, trigger: "blur" }],
        zipcode: [{ required: false, trigger: "blur" }]
      }
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
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
    }
  }
};
</script>

<style>
.btnvip{
  background-color: #6aae00 !important;
}
</style>

