<template>
  <div class="content">
    <div class="new-submits-header">
      <h2 class="title">作业批改列表</h2>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
    </div>
    <hr color="#d3d3d3" style="clear: both"/>
    <!--<el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>-->
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
    ...mapGetters('assignment', {
      submitList: 'getSubmitList'
    })
  },
  created () {
    this.$store.dispatch('assignment/fetchSubmits', this.$route.params.assign_id)
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    getSubmit(val){
      //先找val.submit_id的数据传入store
      this.$store.dispatch("assignment/fetchSubmit", val.submit_id);
      //然后push进去详情页
      this.$router.push({
        name: 'assignmentSubmit',
        params:{
          course: this.$route.params.course,
          assign_id: this.$route.params.assign_id,
          submit_id: val.submit_id
        }
      })
    }
  }
};
</script>
<style>
  .table{
    margin-right: 80px;
    margin-left: 70px;
    width: 90%;
    margin-top: 30px;
  }
  .el-table .cell {
    text-align: center;
  }
  .title{
    margin-top: 10px;
  }
</style>
