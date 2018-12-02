<template>
  <div class="content" align="center" >
    <el-table :data="tableData" border style="width: 90%" class="el-table-test" >
      <el-table-column fixed prop="name" label="名称" width="auto" ></el-table-column>
      <el-table-column prop="start" label="开始时间" width="250"></el-table-column>
      <el-table-column prop="period" label="考试时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">开始</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick (row) {
      console.log(row)
    }
  },

  data () {
    return {
      tableData: [{
        name: '实验第一次考试',
        start: '2018/10/15  14:00',
        period: '2 小时'
      }, {
        name: '实验第二次考试',
        start: '2018/10/15  14:00',
        period: '2 小时'
      }, {
        name: '实验第三次考试',
        start: '2018/10/15  14:00',
        period: '2 小时'
      }, {
        name: '实验第四次考试',
        start: '2018/10/15  14:00',
        period: '2 小时'
      }]
    }
  }
}
</script>
<style>
  .content{
    margin-top: 30px;
  }
  .el-table .cell{
    text-align: center;
  }
  .el-table th>.cell{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-table__header{
    background: #d9d9d9;
  }
</style>
