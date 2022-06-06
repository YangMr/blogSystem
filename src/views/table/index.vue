<template>
  <div>
    <i-table :column="column" index :url="'/article/category/search'" :method="'POST'">
      <template v-slot:operation="scope">
        <el-button size="mini" type="primary" @click="handleEdit(scope.row.sex)">编辑</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </template>
    </i-table>
  </div>
</template>

<script>
export default {
  name: 'index',
  components : {
    'i-table' : () => import("@/components/Table")
  },
  data(){
    return {
      column : [
        {
          label : "分类名称",
          prop : "name",
        },
        {
          label : "排序",
          prop : "sort",
        },
        {
          label : "备注",
          prop : "reamrk"
        },
        {
          label : "状态",
          prop : "status"
        },
        {
          type : "slot",
          label : "操作",
          prop : "operation",
          slot_name : "operation"
        }
      ]
    }
  },
  methods : {
    handleEdit(id){
     console.log(id)
    }
  }
}
</script>

<style scoped>

</style>
