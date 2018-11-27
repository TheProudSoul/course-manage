<template>
  <div class="content">
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="name" label="标题" width="auto"></el-table-column>
      <el-table-column prop="start" label="截止时间" width="250"></el-table-column>
      <el-table-column prop="period" label="发布人" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
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