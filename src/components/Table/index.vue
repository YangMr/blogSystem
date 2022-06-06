<template>
  <div>
    <el-table border :data="tableData" style="width: 100%">
      <el-table-column v-if="index" label="序号" type="index"></el-table-column>
      <el-table-column v-if="checkbox" type="selection"></el-table-column>
      <template  v-for="(item,index) in column">
        <el-table-column  v-if="item.type === 'function'" :key="item.prop"  :prop="item.prop" :label="item.label" >
            <template slot-scope="scope">
              <div v-html="item.callback && item.callback(scope.row)"></div>
            </template>
        </el-table-column>
        <el-table-column v-if="item.type === 'slot'" :prop="item.prop" :label="item.label" >
            <template slot-scope="scope">
              <slot :name="item.slot_name" :row="scope.row"></slot>
            </template>
        </el-table-column>
        <el-table-column v-else :prop="item.prop" :label="item.label" ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>

export default {
  name: 'Table',
  props : {
    column : {
      type : Array,
      default : () => []
    },
    url : {
      type : String,
      default: "",
      require: true
    },
    method: {
      type: String,
      default: "POST",
      require: true
    },
    index : Boolean,
    checkbox : Boolean
  },
  data(){
    return {
      tableData: []
    }
  },
  async beforeMount() {
    const {records ,total} = await this.$axios({
      url : this.url,
      method : this.method,
      data : {}
    })
    this.tableData = records
  }
}
</script>

<style scoped>

</style>
