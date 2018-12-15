<template>
  <div class="content">
    <div>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <h3 class="title">{{assignmentInfo.title}}</h3>
    </div>
    <hr color="gold">
    <div class="desc">
      <div class="desc-title">内容：</div>
      <div class="desc-content">{{assignmentInfo.content}}</div>
    </div>
    <div class="date">
      <p class="date-title">开始日期：</p>
      <p class="date-content">{{assignmentInfo.release_time}}</p>
    </div>
    <div class="date">
      <p class="date-title">截止日期：</p>
      <p class="date-content">{{assignmentInfo.deadline}}</p>
    </div>
    <div class="file" v-if="assignmentInfo.file_flag==0">
      <p class="file-title">附件：</p>
      <el-button type="primary" plain icon="el-icon-download" @click="download">下载附件</el-button>
    </div>

    <!-- 学生操作 -->
    <div v-show="isStudent">
      <div class="answer">
        <p class="answer-title">回答：</p>
        <el-input type="textarea" :autosize="{ minRows: 5}" placeholder="请输入内容" v-model="params.content"></el-input>

        <div class="button">
          <el-upload
            class="upload-demo"
            ref="upload"
            :action="uploadUrl"
            :data="params"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <el-button class="add-file" slot="trigger" size="small" @click="fileInclude = true">上传附件</el-button>
            <el-button class="submit" size="small" @click="submit">提交</el-button>
          </el-upload>
        </div>
      </div>
    </div>

    <!-- 教师操作 -->
    <div v-show="isTeacher" class="buttons-T">
      <el-button type="primary" @click="editAss">修改</el-button>
      <el-button type="primary" @click="getSubmit">批改</el-button>
      <el-button type="danger" @click="submitDelete">删除</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import FileSaver from 'file-saver'

export default {
  data() {
    return {
      assignment_id: this.$route.params.assign_id,
      params:{
        content: ""
      },
      assignmentInfo: {
        assign_id: "",
        title: "",
        content: "",
        release_time: "",
        deadline: "",
        file_id: "",
        file_name: "",
        file_flag: 0
      },
      uploadUrl: '/api/file/v1/resource',
      fileInclude: false
    }
  },
  computed: {
    ...mapGetters("login", {
      isStudent: "isStudent",
      isTeacher: "isTeacher",
      isAdmin: "isAdmin"
    })
  },
  created() {
    this.fetchAssignmentInfo();
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    fetchAssignmentInfo() {
      this.$http("get", "/v1/assignment/" + this.assignment_id, {
        ass_id: this.assignment_id
      }).then(res => {
        console.log(res);
        this.assignmentInfo.assign_id = res.data.assign_id;
        this.assignmentInfo.title = res.data.title;
        this.assignmentInfo.content = res.data.content;
        this.assignmentInfo.release_time = res.data.release_time;
        this.assignmentInfo.deadline = res.data.deadline;
        this.assignmentInfo.file_id = res.data.file_id;
        this.assignmentInfo.file_name = res.data.file_name;
      });
    },
    editAss() {
      this.$router.push({
        name: "setAssignment",
        params: {
          assign_id: this.assignment_id,
          course: this.$route.params.course,
          operation: "edit"
        }
      });
    },
    submit() {
      // console.log(fileList)
      // if(this.params.res_type==''){
      //   this.$notify.error({
      //     title: '错误',
      //     message: "您没有选择资源类型哦~"
      //   })
      // }else{
        this.$refs.upload.submit()        
      // }
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handleSuccess(response, file, fileList){
      console.log(response)
    },
    getSubmit() {
      this.$router.push({
        name: "assignmentSubmits",
        params: {
          course: this.$route.params.course,
          assign_id: this.$route.params.assign_id
        }
      });
    },
    submitDelete() {
      this.$confirm(
        '是否确认删除"' + this.assignmentInfo.title + '"这个作业?',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).then(() => {
          // 真正路径  '/assignment'
          this.$http("post", "/v1/admin/course", {
            action: "delete",
            test_id: this.$route.params.assign_id
          }).then(res => {
            if (res.data.status == 0) {
              this.$message({ type: "success", message: "删除成功!" });
              setTimeout(() => {
                this.$router.push({
                  name: "assignment",
                  params: { course: this.$route.params.course }
                });
              }, 1000);
            } else {
              this.$message({ type: "info", message: res.data.error_msg });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    download(){
      let downloadUrl = '/file/v1/assignment/file/' + this.$route.params.assign_id
      this.$http('get',downloadUrl, {},{responseType: 'arraybuffer'}).then(res=>{
        let url = window.URL.createObjectURL(res.data)
        let link = document.createElement('a')
        link.href = url
        link.download = 'bell.png'
        // document.body.appendChild(link)
        link.click()
        window.URL.revokeObjectURL(this.src)
        // let blob = new Blob([res.data])
        // console.log(typeof(res.data))
        // FileSaver.saveAs(url,"bell.png")
      })
      // let link = document.createElement('a')
      //   link.style.display = 'none'
      //   link.href = downloadUrl
      //   document.body.appendChild(link)
      //   link.click()
    }
  }
};
</script>

<style scoped>
.title {
  display: inline-block;
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 15px
}
.desc-title,
.desc-content,
.file-title,
.btn-file,
.date-content,
.date-title  {
  display: inline-block;
}
.btn-file {
  font-size: 15px;
}
.file,
.answer,
.date,
.desc {
  text-align: left;
  margin-top: 20px;
  margin-left: 220px;
  margin-right: 220px;
  font-size: 18px;
}
.desc-content {
  margin-top: 10px;
  margin-left: 5px;
}
.date-content {
  padding-top: 4px;
}
.answer-title {
  margin-bottom: 10px;
}
.button {
  margin-top: 30px;
  text-align: right;
  margin-right: 220px;
}
.add-file,
.submit {
  background: cornflowerblue;
  color: #fff;
  font-size: 13px;
}
  .buttons-T{
    float: right;
    margin-right: 80px;
    margin-top: 30px;
  }
  .date-title,
  .file-title,
  .desc-title,
  .answer-title{
    font-weight: bold;
  }
</style>
