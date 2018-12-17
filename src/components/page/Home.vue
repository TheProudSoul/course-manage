<template>
  <div class="content-box">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span class="notice-title">通知</span>
      </div>
      <el-table ref="singleTable" :show-header="false" :data="notices" highlight-current-row @row-click="showNotice" style="padding-left:20px;padding-right:20px">
        <el-table-column width="30">
          <template slot-scope="scope">
            <img src="../../assets/i6.png" style="height:20px; width: 20px"/>
          </template>
        </el-table-column>
        <el-table-column property="release_time" label="发布时间" width="180"></el-table-column>
        <el-table-column property="teacher_name" label="发布者" width="80"></el-table-column>
        <el-table-column property="title" label="公告标题"></el-table-column>   
      </el-table>
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
    this.$store.dispatch('notice/fetchNotice', 1)
  },
  methods:{
    showNotice(row, event, column){
      this.$alert(row.content, row.title, {
        confirmButtonText: '确定'
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
  font-weight: bold;
}
.el-card__header {
  border-bottom: 3px solid gold;
  margin-left: 40px;
  margin-right: 40px;
}
</style>
