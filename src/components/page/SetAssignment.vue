<template>
  <div class="content">
    <div class="new-assign-header">
      <h1 class="title">{{title}}</h1>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <hr color="#d3d3d3" style="margin-bottom: 10px; margin-top: 5px"/>
    </div>
    <el-form :model="assignmentInfo" label-width="100px" label-position="left" class="form-assign">
      <el-form-item class="item-title" label="标题：" required>
        <el-input type="text" v-model="assignmentInfo.title" placeholder="请输入作业名称" style="width:220px;float:left"></el-input>
      </el-form-item>
      <el-form-item class="item-title" label="截止时间：" required>
        <el-date-picker v-model="assignmentInfo.deadline" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" style="float: left" placeholder="选择截止时间"></el-date-picker>
      </el-form-item>
      <el-form-item class="item-title" label="作业要求："  required>
        <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 7}" v-model="assignmentInfo.content" placeholder="请输入作业要求"></el-input>
      </el-form-item>
      <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl"
            :data="assignmentInfo"
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
      assignmentInfo: {
        action: 'post',
        title: '',
        content: '',
        deadline: ''
      },
      uploadUrl: 'http://120.79.191.54:8081/currican/assignment',
      fileInclude: false
    }
  },
  created () {
    if (this.$route.params.operation == "edit"){
      this.assignmentInfo.action='update'
      this.assignmentInfo.title = this.originalAssignmentInfo.title,
      this.assignmentInfo.content = this.originalAssignmentInfo.content,
      this.assignmentInfo.assign_id = this.$route.params.assign_id,
      this.assignmentInfo.deadline = this.originalAssignmentInfo.deadline
    }
  },
  computed: {
    title () {
      if (this.$route.params.operation === 'add') {
        return '添加作业'
      } else {
        return '修改作业'
      }
    },
    ...mapGetters("assignment", {
      originalAssignmentInfo: "getAssignment"
    })
  },
  methods:{
    back(){this.$router.go(-1)},
    submit() {
      for(let key in this.assignmentInfo){
        if(this.assignmentInfo[key]===''){
          this.$notify({
            title: '警告',
            message: '请确认信息填写完整！',
            type: 'warning'
          })
          return
        }
      }
      if(this.fileInclude){
        console.log(this.assignmentInfo)
        this.$refs.upload.submit()
      }else{
        this.$http('post','/currican/assignment',this.assignmentInfo,{contentType: 'multipart/form-data'}).then(res=>{
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
  .form-assign{
    margin-top: 30px;
  }
  .item-title{
    margin-right: 240px;
    margin-left: 300px;
    font-weight: bold;
  }
  .item{
    margin-right: 200px;
    margin-left: 300px;
    margin-top: 30px;
    font-weight: bold;
  }
</style>
