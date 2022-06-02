<template>
  <div class="container">
    <el-form :inline="true" :model="queryForm" >
      <el-form-item label="分类名称: ">
        <el-input v-model.trim="queryForm.name" size="mini"></el-input>
      </el-form-item>
      <el-form-item label="状态: ">
        <!-- clearable 清空按钮，filterable 是否可搜索 -->
        <el-select v-model.trim="queryForm.status" clearable filterable size="mini" style="width:85px;">
<!--          <el-option label="禁用" value="0"></el-option>-->
<!--          <el-option label="正常" value="1"></el-option>-->
          <el-option v-for="(item,index) in statusOptions" :label="item.name" :value="item.code"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" >重置</el-button>
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" >新增</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="categoryList"
      border
      stripe
      style="width: 100%;">
      <el-table-column align="center" label="序号" type="index" width="60"></el-table-column>
      <el-table-column align="center" prop="name" label="分类名称" ></el-table-column>
      <el-table-column align="center" prop="sort" label="排序"></el-table-column>
      <el-table-column align="center" prop="remark" label="备注"></el-table-column>
      <el-table-column align="center" prop="status" label="状态" width="160">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status === 0 ? 'danger' : 'success'">{{scope.row.status === 0 ? '禁用' : "正常"}}</el-tag>-->
          <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
          <el-tag v-if="scope.row.status === 0" type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="mini">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="current"
      :page-sizes="[10, 20, 50]"
      :page-size="size"
      layout="total, sizes, prev, pager, next"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import Category from '@/api/category'
import {statusOptions} from "../../enum/category-satus"
export default {
  name: 'index',
  data(){
    return {
      categoryList : [],
      current : 1,
      size : 20,
      total : 0,
      queryForm : {
        name : "",
        status : ""
      },
      statusOptions
    }
  },
  created() {
    this.initLoadList()
  },
  methods : {
    async initLoadList(){
      try{
        const data = {current : this.current, size : this.size, ...this.queryForm}
        const {records, total} = await Category.getCategoryList(data)
        this.categoryList = records
        this.total = total
      }catch (e) {
        console.log(e)
      }
    },
    handleSizeChange(size){
      this.size = size
      this.initLoadList()
    },
    handleCurrentChange(page){
      this.current = page
      this.initLoadList()
    },
    handleQuery(){
      this.current = 1
      this.initLoadList()
    },
    handleDelete(id){
      this.$confirm('确认删除这条记录吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        try{
          const response = await Category.deleteCategory(id)
          this.current = 1
          this.initLoadList()
          this.$message({ type: 'success', message: '删除成功!' });
        }catch (e) {
          console.log(e)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    }
  }
}
</script>

<style scoped>

</style>
