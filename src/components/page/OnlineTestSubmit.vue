<template>
  <div class="content">
    <div>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <h3 class="title">{{submit.student_name}}的提交记录</h3>
    </div>
    <hr color="#d3d3d3" style="margin-bottom: 20px; margin-top: 20px"/>
    <div class="vector">
      <div class="vector-label">学生姓名：</div>
      <div class="vector-data">{{submit.student_name}}</div>
    </div>
    <div class="vector">
      <div class="vector-label">测试标题：</div>
      <div class="vector-data">{{submit.test_title}}</div>
    </div>
    <div class="vector">
      <div class="vector-label">学号：</div>
      <div class="vector-data">{{submit.student_no}}</div>
    </div>
    <div class="vector">
      <div class="vector-label">提交时间：</div>
      <div class="vector-data">{{submit.time}}</div>
    </div>
    <div class="vector">
      <div class="vector-label">提交内容：</div>
      <div class="vector-data">{{submit.content}}</div>
    </div>
    <div class="vector">
      <div class="vector-label">分数：</div>
      <div class="vector-data mark">{{submit.mark}}</div>
      <el-button type="primary" plain icon="el-icon-download">评分</el-button>
    </div>
    <div class="vector">
      <div class="vector-label">附件：</div>
      <el-button type="primary" plain icon="el-icon-download">下载附件</el-button>
      <!-- <el-button type="text" class="btn-file">{{assignmentInfo.file_name}}</el-button> -->
    </div>
    <!-- 在分数旁边弄个按钮评分 -->
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  computed:{
    ...mapGetters('test', {
      submit: 'getSubmit'
    })
  },
  created () {
    this.$store.dispatch('test/fetchSubmit', this.$route.params.submit_id)
  },
  methods:{
    back(){
      this.$router.go(-1)
    },
    setMark(){

    }
  }
};
</script>

<style>
.title {
  display: inline-block;
  font-size: 24px; 
  margin-top: 10px; 
  margin-bottom: 15px
}
.vector-label,
.vector-data {
    display: inline-block;
}
.mark{
  color:"#ff9900"
}
</style>
