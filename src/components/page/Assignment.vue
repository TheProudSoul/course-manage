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
      <el-table-column fixed prop="title" label="标题" width="auto"></el-table-column>
      <el-table-column prop="release_time" label="发布时间" width="250"></el-table-column>
      <el-table-column prop="deadline" label="截止时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
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
  data () {
    return {
      assignmentList: []
    }
  },
  computed: {
    ...mapGetters('login', {
      isStudent: 'isStudent',
      isTeacher: 'isTeacher',
      isAdmin: 'isAdmin'
    })
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchAssignmentList()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchAssignmentList()
    next()
  },
  methods: {
    fetchAssignmentList () {
      this.$http('get', '/assignment', {
        sec_id: this.$route.params.course
      }).then(res => {
        this.assignmentList = res.data.assignment
      })
    },
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