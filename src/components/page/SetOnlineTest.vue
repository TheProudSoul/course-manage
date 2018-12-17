<template>
  <div class="content">
    <div class="new-test-header">
      <h1 class="title">{{title}}</h1>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <hr color="#d3d3d3" style="margin-bottom: 10px; margin-top: 5px"/>
    </div>
    <el-form :model="testInfo" label-width="100px" :hide-required-asterisk="false" status-icon
        label-position="left" class="form-test">
      <el-form-item class="item-title" label="名称：" required>
        <el-input type="text" v-model="testInfo.title" placeholder="请输入测试名称" style="float: left;width: 220px"></el-input>
      </el-form-item>
      <el-form-item class="item-title" label="测试内容：" required>
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 7}"
          v-model="testInfo.content"
          placeholder="请输入测试内容"
        ></el-input>
      </el-form-item>
      <el-form-item class="item" label="开始时间：" required>
        <el-date-picker v-model="testInfo.start_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="float: left" placeholder="选择开始时间"></el-date-picker>
      </el-form-item>
      <el-form-item class="item" label="截止时间：" required>
        <el-date-picker v-model="testInfo.end_time" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="float: left" placeholder="选择截止时间"></el-date-picker>
      </el-form-item>
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl"
            :data="testInfo"
            :on-change="onChange"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-error="handleError"
          >
            <el-button class="add-file" slot="trigger" size="small">上传附件</el-button>
            <el-button class="submit" size="small" @click="submit">提交</el-button>
          </el-upload>
    </el-form>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex"

export default {
  data () {
    return {
      testInfo: {
        action: 'post',
        title: '',
        start_time: '',
        end_time: '',
        content: ''
      },
      uploadUrl: 'http://120.79.191.54:8081/currican/online_test',
      fileInclude: false
    }
  },
  computed: {
    title() {
      if (this.$route.params.operation == "add") {
        return "添加在线测试";
      } else if (this.$route.params.operation == "edit") {
        return "修改在线测试";
      }
    },
    ...mapGetters("test", {
      originalTestInfo: "getTest"
    })
  },

  created() {
    if (this.$route.params.operation == "edit"){
      this.testInfo.action = 'update'
      this.testInfo.title = this.originalTestInfo.title,
      this.testInfo.start_time = this.originalTestInfo.start_time,
      this.testInfo.test_id = this.$route.params.test_id,
      this.testInfo.end_time = this.originalTestInfo.end_time,
      this.testInfo.content = this.originalTestInfo.content
    }
  },

  methods:{
    back(){this.$router.go(-1)},
    submit() {
      for(let key in this.testInfo){
        if(this.testInfo[key]===''){
          this.$notify({
            title: '警告',
            message: '请确认信息填写完整！',
            type: 'warning'
          })
          return
        }
      }
      if (this.fileInclude){
        this.$refs.upload.submit()
      } else {
        this.$http('post','/currican/online_test',this.testInfo,{contentType: 'multipart/form-data'}).then(res=>{
          if(res.data.status==0){
            this.$alert("提交成功", "消息", {
              confirmButtonText: "确定",
              beforeClose: (action, instance, done) => {
                this.$router.go(-1)
              }
            })
          } else {
            this.$alert(res.data.error_msg, "提交失败", {
              confirmButtonText: "确定"
            })
          }
        })        
      }
    },
    onChange(file,fileList){
      if(fileList.length==0){
        this.fileInclude = false
      }else{
        this.fileInclude = true
      }
    },
    // 文件列表移除文件时的钩子
    handleRemove(file,fileList){
      if(fileList.length==0){
        this.fileInclude = false
      }
    },
    
    handleSuccess(res, file, fileList){
      if(res.status==1){
        this.$alert(res.error_msg, "提交失败", {
          confirmButtonText: "确定"
      })
      }else{
        this.$alert("提交成功", "消息", {
          confirmButtonText: "确定",
          beforeClose: (action, instance, done) => {
            this.$router.go(-1)
          }
        })
      }
    },
    handleError(err, file, fileList){
      this.$notify.error({
        title: '错误',
        message: `啊哦~提交失败了！`
      })
    }
  }
}
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
