<template>
  <div class="content" align="center" >
    <el-table :data="onlineTestList" border style="width: 90%" class="el-table-test" >
      <el-table-column fixed prop="title" label="标题" width="auto" ></el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="250"></el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="getTest(scope.row)" type="text" size="small">开始</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onlineTestList: []
    };
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchTestList();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchTestList();
    next();
  },
  methods: {
    fetchTestList() {
      this.$http("get", "/online_test", {
        sec_id: this.$route.params.course
      }).then(res => {
        this.onlineTestList = res.data.online_test;
      });
    },
    getTest(row) {
      this.$router.push({
        name: "onlinetestInfo",
        params: {
          test_id: row.test_id,
          course: this.$route.params.course
        }
      });
      console.log(row);
    }
  }
};
</script>
<style>
  .content{
    margin-top: 30px;
  }
  .el-table .cell{
    text-align: center;
    font-size: 14px;
  }
  .el-table th>.cell{
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .el-table__header{
    background: #d9d9d9;
  }
</style>
