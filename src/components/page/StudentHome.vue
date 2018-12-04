<template>
  <div class="content-box">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="notice-title">通知</span>
      </div>
      <div v-for="notice in notices" :key="notice.notice_id" class="text item" >
        <i class="fa fa-comment"></i>
        <span style="margin-left: 10px">{{notice.title}}</span>
      </div>
    </el-card>
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
    this.fetchNotice()
  },
  methods: {
    fetchNotice() {
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
.content-box{
  margin-right: 35px;
  margin-bottom: 30px;
}
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
  border-bottom: 3px solid gold;
  margin-left: 30px;
  margin-right: 30px;
}
</style>
