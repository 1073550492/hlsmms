<template>
    <div class="pagenum">
        <span>首页</span>
        <el-pagination background layout="prev, pager, next" :total="3" prev-text="上一页" next-text="下一页">
        </el-pagination>
        <span>尾页</span>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
.pagenum {height: 32px;line-height: 32px;margin-top: 20px}
.pagenum span{margin-right:5px;color: #6aae00;}
.pagenum span,.pagenum div{float: left;}
.pagenum .el-pagination.is-background .el-pager li:not(.disabled).active{background-color: #6aae00;}
.pagenum .el-pagination.is-background .btn-prev,.pagenum .el-pagination.is-background .btn-next{background-color: rgba(0, 0, 0, 0);}
</style>


