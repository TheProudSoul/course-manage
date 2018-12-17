<template>
  <div class="content" align="center">
    <h3 class="test-list" style="float: left">在线测试列表</h3>
    <el-button class="btn-new-test"
               style="float: right; font-size: medium; margin-top: 0; color: #F56C6C"
               icon="el-icon-circle-plus-outline"
               v-show="isTeacher"
               type="text"
               @click="handleAdd">发布</el-button>
    <hr class="cut-line" color="gray" />
    <el-table :data="onlineTestList" border style="width: 90%" class="el-table-test">
      <el-table-column prop="title" label="标题" width="auto"></el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="250"></el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="250"></el-table-column>
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-show="isStudent" @click="getTest(scope.row)" type="text" size="small">开始</el-button>
          <el-button v-show="isTeacher" @click="getTest(scope.row)" type="text" size="small">查看</el-button>
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
    ...mapGetters('test', {
      onlineTestList: 'getTestList'
    })
  },
  created () {
    this.$store.dispatch('test/fetchTestList')
  },
  methods: {
    getTest (row) {
      this.$router.push({
        name: 'onlinetestInfo',
        params: {
          test_id: row.test_id,
          course: this.$route.params.course
        }
      })
    },
    handleAdd () {
      this.$router.push({
        name: 'setOnlinetest',
        params: {
          course: this.$route.params.course,
          operation: 'add'
        }
      })
    }
  }
}
</script>
<style>
.content {
  margin-top: 20px;
}
.el-table .cell {
  text-align: center;
  font-size: 14px;
}
.el-table th > .cell {
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-table__header {
  background: #d9d9d9;
}
.btn-new-test,
.test-list{
    display: inline-block;
  margin-right: 30px;
  margin-left: 30px;
}
.test-list{
  margin-bottom: 15px;
}
.cut-line{
  clear: both;
  margin-bottom: 20px;
}
</style>
