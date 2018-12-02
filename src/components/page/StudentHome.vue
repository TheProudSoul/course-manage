<template>
  <div class="content-box">
    <!-- <div class="content"> -->
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="notice-title">通知</span>
      </div>
      <div v-for="notice in notices" :key="notice.notice_id" class="text item" >
        <i class="fa fa-comment"></i>
        <span style="margin-left: 10px">{{notice.title}}</span>
      </div>
    </el-card>
    <!-- <el-table :data="notice">
        <el-table-column label="通知" prop="date">
    <template slot-scope="scope">-->
    <!-- http://www.fontawesome.com.cn/icons-ui/ -->
    <!-- <i class="fa fa-info-circle" aria-hidden="true"></i>
    <i class="fa fa-sticky-note" aria-hidden="true"></i>-->
    <!-- <i class="fa fa-comment"></i>
            <span style="margin-left: 10px">{{ scope.row.notice_id }}</span>
          </template>
        </el-table-column>
    </el-table>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      notices: ''
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$http('get', '/notice').then(res => {
        console.log(res)
        this.notices = res.data.notice
        console.log(this.notices)
      })
    }
  }
}
</script>

<style>
.text {
  font-size: 15px;
  text-align: left;
  padding-left: 50px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.item:hover{
  background: aliceblue;
}

.item {
  margin-bottom: 5px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  height: 100%;
}

.notice-title{
  font-style: unset;
  font-size: 24px;
}

.el-card__header {
  border-bottom: 2px solid gold;
  margin-left: 30px;
  margin-right: 30px;
}

</style>
