<template>
  <div class="content-box">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="notice-title">通知</span>
      </div>
      <div v-for="notice in notices" :key="notice.notice_id" class="text item" >
        <img  src="../../assets/i2.png" style="height:20px; width: 20px;"/>
        <!-- <i class="fa fa-comment"></i> -->
        <span style="margin-left: 10px">{{notice.title}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      notices: state => state.notice.noticeList
    })
  },
  created () {
    this.$store.dispatch('notice/fetchNotice', -1)
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
  font-weight: bold;
}
.el-card__header {
  border-bottom: 3px solid gold;
  margin-left: 40px;
  margin-right: 40px;
}
</style>