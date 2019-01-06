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
            <h2>商品管理</h2>
             <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">    
              <el-menu-item index="/addgoods"><router-link to="/addgoods">添加商品</router-link></el-menu-item>
              <el-menu-item index="/googdsmanage"><router-link to="/goodsmanage">商品管理</router-link></el-menu-item>
            </el-menu>
          </div>
          <div class="text item">
                 <!-- 搜索 -->
            <div>
                <!-- 设置 inline 属性可以让表单域变为行内的表单域 -->
                <el-form :inline="true" :model="formSearch" class="demo-form-inline">
                    <el-form-item label="所属分类">
                      <el-select v-model="formSearch.classname" placeholder="请选择分类">
                        <el-option label="日用品" value="日用品"></el-option>
                        <el-option label="零食" value="零食"></el-option>
                        <el-option label="酒水" value="酒水"></el-option>
                        <el-option label="饮料" value="饮料"></el-option>
                        <el-option label="服装" value="服装"></el-option>
                      </el-select>
                    </el-form-item>
                    
                    <el-form-item label="关键词">
                        <el-input id="keywords" v-model="formSearch.keywords" placeholder="查询商品名称、条形码"></el-input>
                    </el-form-item>
                    
                    <el-form-item>
                        <el-button type="success" @click="onSearch()" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div id="searchBox"></div>
            <!-- 管理列表 -->
            <div>
              <el-table :data="tableData" style="width: 100%">
                <el-table-column label="商品条码">
                  <template slot-scope="scope">
                    {{ scope.row.barcode }}
                  </template>
                </el-table-column>

                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                      {{ scope.row.goodsname }}
                  </template>
                </el-table-column>

                <el-table-column label="所属分类">
                  <template slot-scope="scope">
                      {{ scope.row.classname }}
                  </template>
                </el-table-column>

                <el-table-column label="售价">
                  <template slot-scope="scope">
                      {{ scope.row.saleprice }}
                  </template>
                </el-table-column>

                <el-table-column label="市场价">
                  <template slot-scope="scope">
                      {{ scope.row.marketprice }}
                  </template>
                </el-table-column>

                <el-table-column label="成本价">
                  <template slot-scope="scope">
                      {{ scope.row.costprice }}
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.row.goodsid)" class="btnetd"><i class="el-icon-edit"></i> 编辑</el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.row.goodsid)"
                      class="btndel"
                    ><i class="el-icon-delete"></i>删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 分页 -->
            <!-- 设置background属性可以为分页按钮添加背景色。 -->
            <div id="pagerBox">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[1,2,3,5,10,20,50,100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                background
                :total="total">
                </el-pagination>
            </div>
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
        currentPage:1, //当前在那页，默认值
        pageSize:5,    //每页大小，默认值
        total: 0,      //总记录数量
        // 查询的表单
        formSearch: {
          classname: '',
          keywords: ''
        },
        tableData: []
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  },
  methods:{
    handleSelect(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleEdit(index,row){
        console.log(index,row);
      },
      handleDelete(index,row){
        console.log(index,row);
      },
      //由于第一次全表查询，和点击搜索按钮请求的是同一个地址，所以把请求合并为一个方法 分别调用
      getGoods(){
        this.axios.get(
          //传入分页参数
          this.apiHost+`/goods/getgoods?classname=${this.formSearch.classname}&keywords=${this.formSearch.keywords}&pagesize=${this.pageSize}&currentpage=${this.currentPage}`
        ).then(result=>{
          //把查询到的商品信息的数组对象赋值给表格数据属性
          this.tableData=result.data.goodsArray;
          //把后端返回的total总记录数赋值给tatal属性
          this.total=result.data.total;
        }).catch(err=>{
          console.log(err.message);
        })
      },
       //查询按钮执行的方法
    onSearch(){
        console.log('搜索的分类和关键词',this.formSearch);
        //1）前端——点击搜索按钮就把 商品分类和关键词 发送到后端api
        this.getGoods();
    },
    //改变每页大小的方法
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        //把改变后的值赋值给数据属性
        this.pageSize=val;
        this.getGoods();
    },
    //改变当前页的方法
    handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        //把改变后的值赋值给数据属性
        this.currentPage=val;
        this.getGoods();
    },

    //删除商品
    handleDelete(goodsid){
      console.log("要删除的商品的id",goodsid);
      //发送ajax到后端
      this.axios.get(this.apiHost+"/goods/dellist?goodsid="+goodsid)
      .then(result=>{
        console.log("后端返回的数据",result);
        //根据后代那返回的数据进行处理
        result=result.data;
        if(result.isOk){
             this.$message({
              message: result.msg,
              type: "success"
            });
            this.getGoods();
        }else{
          this.$message.error("错了哦", result.msg);
        }
        
      }).catch(err=>{
        this.$message.error("错了哦", err.message);
      })
    },

    //修改商品
    handleEdit(goodsid){
      //获取要修改的商品的id
      console.log("要修改的商品的id",goodsid);
      //发送ajax请求到后端获取数据
      this.axios.get()
      
    }

  },
  mounted(){
    console.log("vue的视图挂载完毕!");
  },
  created(){
    //console.log("vue实例创建完毕!");
    //发起ajax获取商品信息
    this.getGoods();
  }
};
</script>

<style>
#pagerBox{
  margin-top: 20px;
}
.el-pagination{padding: 12px 7px !important;}
.el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #6aae00 !important;
}
.btndel {
  background-color: #e87272 !important;
}
.btnetd{
  background-color: #ccc !important;
}
</style>

