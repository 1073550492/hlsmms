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
            <h2>分类管理</h2>
             <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">    
              <el-menu-item index="/addclass"><router-link to="/addclass">添加分类</router-link></el-menu-item>
              <el-menu-item index="/classmanage"><router-link to="/classmanage">分类管理</router-link></el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%" stripe>
              
              <el-table-column label="分类名称" width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <p>姓名: {{ scope.row.name }}</p>
                    <p>住址: {{ scope.row.address }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.name }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="管理">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
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
      tableData: [{
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }, {
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
        ]
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  },
  methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
    handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>

<style>
</style>

