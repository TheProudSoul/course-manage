<template>
  <!-- 按钮统一为“确认” -->
  <!-- 使用input动态绑定value -->
  <div class="content">
    <div class="new-test-header">
      <h1 class="title">{{title}}</h1>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <hr color="#d3d3d3" style="margin-bottom: 10px; margin-top: 5px"/>
    </div>
    <el-form :model="testInfo" label-width="100px" ref="testInfo" :hide-required-asterisk="false" status-icon
        :rules="submitRules" label-position="left" class="form-test">
      <el-form-item class="item-title" label="名称：" required>
        <el-input type="text" v-model="testInfo.title" placeholder="请输入测试名称" clearable style="float: left;width: 220px"></el-input>
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
          >
            <el-button class="add-file" slot="trigger" size="small">上传附件</el-button>
            <el-button class="submit" size="small" @click="submit">提交</el-button>
          </el-upload>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    var validateTitle = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入标题"));
      } else {
        callback();
      }
    }
    var validateST = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    }
    var validateET = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    }
    return {
      testInfo: {
        action: 'post',
        title: '',
        start_time: '',
        end_time: '',
        content: ''
      },
      submitRules: {
        title: [
          {
            required: true,
            validator: validateTitle,
            message: "请输入标题",
            trigger: "blur"
          }
        ],
        start_time: [
          {
            type: 'datetime',
            required: true,
            validator: validateST,
            message: "请选择开始时间",
            trigger: 'change' 
          }
        ],
        end_time: [
          {
            type: 'datetime',
            required: true,
            validator: validateET,
            message: "请选择截止时间",
            trigger: 'change' 
          }
        ]
      },
      uploadUrl: '/api/file/v1/online_test',
      fileInclude: false
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
    back(){this.$router.go(-1)},
    submit() {
      console.log(this.testInfo)
      this.$refs.testInfo.validate(valid => {
        if(valid){
          if(this.fileInclude){
            this.$refs.upload.submit()
          } else {
            this.$http('post','/v1/assign_submit',this.testInfo).then(res=>{
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
        } else {
          this.$notify({
            title: "警告",
            message: "您的信息填写有误，请重新检查哟~",
            type: "warning"
          })
        }
      })

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
