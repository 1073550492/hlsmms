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
            <h2>系统信息</h2>
          </div>
          <div class="text item">
            <el-alert title="商品总数：5。已销售的总金额：890.00。库存商品总价：1235.82" type="info" show-icon>
            </el-alert>
            <el-alert title="导入数据" type="info" show-icon class="lasttitle">
            </el-alert>
            <el-row :gutter="40">
              <!-- 左边 -->
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <h2>销售排行</h2>
                  </div>
                  <div class="text item">
                    <el-table :data="tableData" stripe style="width: 100%">
                      <el-table-column prop="goodsname" label="商品名称">
                      </el-table-column>
                      <el-table-column prop="salenum" label="销量">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-col>
              <!-- 右边 -->
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <h2>缺货的商品</h2>
                  </div>
                  <div class="text item">
                    <el-table :data="tableDatatwo" stripe style="width: 100%">
                      <el-table-column prop="tradename" label="商品名称">
                      </el-table-column>
                      <el-table-column prop="stock" label="库存">
                      </el-table-column>
                      <el-table-column prop="operation" label="操作">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-col>
            </el-row>
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
      isOpened: true,
      tableData: [
        { goodsname: "海飞丝去屑洗发水", salenum: 8 },
        { goodsname: "茅台酒", salenum: 6 },
        { goodsname: "龙凤呈祥", salenum: 5 },
        { goodsname: "龙凤呈祥2", salenum: 2 }
      ],
      tableDatatwo: [{ tradename: "我的优乐美", stock: 0, operation: "入库" }]
    };
  },
  components: {
    LeftMenu,
    RightTop,
    RightButtom
  }
};
</script>

<style>
</style>

