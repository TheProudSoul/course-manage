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
      <el-table-column fixed prop="title" label="标题" width="auto"></el-table-column>
      <el-table-column prop="start_time" label="开始时间" width="250"></el-table-column>
      <el-table-column prop="end_time" label="结束时间" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="300">
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
  data () {
    return {
      onlineTestList: []
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
    this.fetchTestList()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchTestList()
    next()
  },
  methods: {
    fetchTestList () {
      this.$http('get', '/online_test', {
        sec_id: this.$route.params.course
      }).then(res => {
        this.onlineTestList = res.data.online_test
      })
    },
    getTest (row) {
      this.$router.push({
        name: 'onlinetestInfo',
        params: {
          test_id: row.test_id,
          course: this.$route.params.course
        }
      })
      console.log(row)
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
