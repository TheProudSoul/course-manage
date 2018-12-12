<template>
  <!-- 按钮统一为“确认” -->
  <!-- 使用input动态绑定value -->
  <div class="content">
    <div class="new-test-header">
      <h1 class="title">{{title}}</h1>
      <el-button
        class="btn-return"
        icon="el-icon-back"
        circle
        style="float: left; margin-top: 10px"
        @click="back"
      ></el-button>
      <hr color="#d3d3d3" style="margin-bottom: 20px; margin-top: 20px"/>
    </div>
    <el-form :model="testInfo" ref="testInfo" label-width="50px" label-position="left" class="form-test">
      <el-form-item class="item-title" label="名称：" label-width="60px">
        <el-input type="text" v-model="testInfo.title" placeholder="请输入测试名称" clearable style="margin-left: 40px"></el-input>
      </el-form-item>
      <el-form-item class="item" label="开始时间：" label-width="100px">
        <el-input type="text" v-model="testInfo.start_time" placeholder="2016-06-06 19:00" clearable></el-input>
      </el-form-item>
      <el-form-item class="item" label="截止时间：" label-width="100px">
        <el-input
          type="text"
          v-model="testInfo.start_time"
          placeholder="2016-06-06 21:00"
          clearable></el-input>
      </el-form-item>
      <el-form-item class="item" label="添加附件：" label-width="100px">
        <el-button type="primary" plain icon="el-icon-upload2" style="float: left">上传附件</el-button>
      </el-form-item>
    </el-form>
    <el-button type="primary" style="float: right; margin-right: 200px; margin-top: 15px">确认</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      testInfo: {
        test_id: '',
        title: '',
        start_time: '',
        end_time: '',
        file_id: '',
        file_name: ''
      }
    }
  },
  computed: {
    title() {
      if (this.$route.params.operation == "add") {
        return "添加在线测试";
      } else {
        return "修改在线测试";
      }
    }
  },
  methods:{
    back(){this.$router.go(-1)}
  }
};
</script>

<style>
  .title{
    display: inline-block;
  }
  .form-test{
    margin-top: 30px;
  }
  .item-title{
    margin-right: 240px;
    margin-left: 300px
  }
  .item{
    margin-right: 200px;
    margin-left: 300px;
    margin-top: 30px
  }
</style>