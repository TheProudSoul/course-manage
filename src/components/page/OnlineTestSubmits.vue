<template>
  <div class="content">
    <!-- 返回键 -->
    <div class="new-submits-header">
      <h2 class="title">测试批改列表</h2>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
    </div>
    <hr color="#d3d3d3" style="clear: both"/>
    <!-- 弄个可以点击的列表 跟通知页差不多，id嵌进去-->
    <el-table class="table" ref="submitTable" :data="submitList" highlight-current-row @current-change="getSubmit">
    <el-table-column property="student_no" label="学号" width="400"></el-table-column>
    <el-table-column property="student_name" label="学生姓名" width="350"></el-table-column>
    <el-table-column property="mark" label="分数"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed:{
    ...mapGetters('test', {
      submitList: 'getSubmitList'
    })
  },
  created () {
    this.$store.dispatch('test/fetchSubmits', this.$route.params.test_id)
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    getSubmit(val){
      this.$store.dispatch("test/fetchSubmit", val.submit_id);
      this.$router.push({
        name: 'testSubmit',
        params:{
          course: this.$route.params.course,
          test_id: this.$route.params.test_id,
          submit_id: val.submit_id
        }
      })
    }
  }
};
</script>
<style>
  .title,
  .btn-return{
    display: inline-block;
  }
  .title{
    margin-top: 0;
    margin-right: 25px;
  }
  .btn-return{
    margin-bottom: 10px;
  }
  .table{
    margin-right: 80px;
    margin-left: 70px;
    width: 90%;
    margin-top: 30px;
  }
  .el-table .cell {
    text-align: center;
  }
</style>
