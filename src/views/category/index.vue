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
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="mini" @click="handleOpenDialog(null)">新增</el-button>
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
          <el-button type="success" size="mini" @click="handleOpenDialog(scope.row.id)">编辑</el-button>
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

    <el-dialog :before-close="handleResetDialog" :title="title ? '编辑' : '新增'" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dialogForm" :model="dialogForm" :rules="rules" status-icon label-width="100px" style="width:400px;">
        <el-form-item label="分类名称:" prop="name">
          <el-input v-model="dialogForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-radio-group v-model="dialogForm.status">
            <el-radio :label="1" >正常</el-radio>
            <el-radio :label="0" >禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="排序:"  prop="sort">
          <el-input-number v-model="dialogForm.sort" ></el-input-number>
        </el-form-item>
        <el-form-item label="备注:" prop="remark">
          <el-input type="textarea" v-model="dialogForm.remark"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="handleSubmit">确 定</el-button>
          <el-button size="mini" @click="handleResetDialog">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Category from '@/api/category'
import {statusOptions} from "../../enum/category-satus"
export default {
  name: 'index',
  data(){
    return {
      title : "",
      dialogFormVisible : false,
      dialogForm : {},
      rules : {
        name : [{required : true, message : "请输入分类名称", trigger : "blur"}],
        status : [{required : true, message : "请选择状态", trigger : "change"}],
        sort : [{required : true, message : "请输入排序号", trigger : "blur"}]
      },
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
    /**
     * 初始化分类列表数据
     * @returns {Promise<void>}
     */
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
    /**
     * 分页条数发生变化会触发的方法
     * @param size
     */
    handleSizeChange(size){
      this.size = size
      this.initLoadList()
    },
    /**
     * 分页页码发生变化会触发的方法
     * @param page
     */
    handleCurrentChange(page){
      this.current = page
      this.initLoadList()
    },
    /**
     * 分类查询
     */
    handleQuery(){
      this.current = 1
      this.initLoadList()
    },
    /**
     * 删除分类
     * @param id
     */
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
    },
    /**
     * dialog弹窗确定按钮执行的方法
     */
    handleSubmit(){
      this.$refs["dialogForm"].validate(valid=>{
        if(!valid) return
        if(!this.title){
          this.handleAddSubmit()
        }else{
          this.handleEditSubmit()
        }
      })
    },
    /**
     * 新增分类
     * @returns {Promise<void>}
     */
    async handleAddSubmit(){
      try {
        const response = await Category.addCategory(this.dialogForm)
        this.initLoadList()
        this.handleResetDialog()
        this.$message.success("新增成功")
      }catch (e) {
        console.log(e)
        this.$message.error("新增失败")
      }
    },
    /**
     * 编辑分类
     * @returns {Promise<void>}
     */
    async handleEditSubmit(){
      try {
        const response = await Category.editCategory(this.dialogForm.id, this.dialogForm)
        this.initLoadList()
        this.handleResetDialog()
        this.$message.success("编辑成功")
      }catch (e) {
        console.log(e)
        this.$message.error("编辑失败")
      }
    },
    /**
     * 打开弹窗
     * @param id
     */
    handleOpenDialog(id){
      this.dialogFormVisible = true
      this.title = id
      if(id) this.handleFind(id)
    },
    /**
     * 查询单个分类，进行回显
     * @param id
     * @returns {Promise<void>}
     */
    async handleFind(id){
      try{
        const response = await Category.findCategory(id)
        this.dialogForm = response
      }catch (e) {
        console.log(e)
      }
    },
    /**
     * 关闭弹窗以及让弹窗表单重置
     */
    handleResetDialog(){
      this.$refs["dialogForm"].resetFields()
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>

</style>
