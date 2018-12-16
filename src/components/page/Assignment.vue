<template>
  <div class="content">
    <h3 class="assign-list" style="float: left">作业列表</h3>
    <el-button class="btn-new-assign"
               style="float: right; font-size: medium; margin-top: 0; color: #F56C6C"
               icon="el-icon-circle-plus-outline"
               v-show="isTeacher"
               type="text"
               @click="handleAdd">发布</el-button>
    <hr class="cut-line" color="gray" />
    <el-table :data="assignmentList"
              border
              style="width: 90%" class="el-table-assign">
      <el-table-column prop="title" label="标题" width="auto"></el-table-column>
      <el-table-column prop="release_time" label="发布时间" width="250"></el-table-column>
      <el-table-column prop="deadline" label="截止时间" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-show="isStudent" @click="getAssignment(scope.row)" type="text" size="small">开始</el-button>
          <el-button v-show="isTeacher" @click="getAssignment(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapGetters('login', {
      isStudent: 'isStudent',
      isTeacher: 'isTeacher',
      isAdmin: 'isAdmin'
    }),
    ...mapGetters('assignment', {
      assignmentList: 'getAssignmentList'
    })
  },
  created () {
    this.$store.dispatch('assignment/fetchAssignmentList')
  },
  methods: {
    getAssignment (row) {
      this.$router.push({
        name: 'assignmentInfo',
        params: {
          assign_id: row.assign_id,
          course: this.$route.params.course
        }
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'setAssignment',
        params: {
          course: this.$route.params.course,
          operation: 'add'
        }
      })
    }
  }
}
</script>

<!--修改-->
<style>
.el-table .cell {
  text-align: center;
}
.assign-list,
.btn-new-assign{
  display: inline-block;
  margin-right: 30px;
  margin-left: 30px;
}
.cut-line{
  clear: both;
  margin-bottom: 10px;
}
.assign-list{
  margin-bottom: 15px;
}
/*.el-table th>.cell{*/
/*margin-top: 10px;*/
/*margin-bottom: 10px;*/
/*}*/
/*.content {*/
  /*margin-top: 20px;*/
  /*margin-left: 10px;*/
  /*margin-right: 20px;*/
/*}*/
  .el-table-assign{
    margin-left: auto;
    margin-right: auto;
  }
</style>