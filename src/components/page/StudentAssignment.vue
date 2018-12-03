<template>
  <div class="content">
    <el-table :data="assignmentList" border style="width: 100%">
      <el-table-column fixed prop="title" label="标题" width="auto"></el-table-column>
      <el-table-column prop="release_time" label="发布时间" width="250"></el-table-column>
      <el-table-column prop="deadline" label="截止时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="getAssignment(scope.row)" type="text" size="small">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      assignmentList: []
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchAssignmentList();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchAssignmentList();
    next();
  },
  methods: {
    fetchAssignmentList() {
      this.$http("get", "/assignment", {
        sec_id: this.$route.params.course
      }).then(res => {
        this.assignmentList = res.data.assignment;
      });
    },
    getAssignment(row) {
      this.$router.push({
        name: "assignment",
        params: {
          assign_id: row.assign_id,
          course: this.$route.params.course
        }
      });
    }
  }
};
</script>

<!--修改-->
<style>
.el-table .cell {
  text-align: center;
}
/*.el-table th>.cell{*/
/*margin-top: 10px;*/
/*margin-bottom: 10px;*/
/*}*/
.content {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 20px;
}
</style>
