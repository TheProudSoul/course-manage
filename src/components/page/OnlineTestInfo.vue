<template>
  <div class="content">
    <div>
      <el-button
        class="btn-return"
        icon="el-icon-back"
        circle
        style="align-content: left; float: left"
        @click="back"
      ></el-button>
      <h3
        class="title"
        style="font-size: 24px; margin-top: 10px; margin-bottom: 15px"
      >{{testInfo.title}}</h3>
    </div>
    <hr color="gold">
    <div class="desc">
      <div class="desc-title">内容：</div>
      <div class="desc-content">{{testInfo.content}}</div>
    </div>
    <div class="date">
      <p class="date-title">开始日期：</p>
      <p class="date-content">{{testInfo.start_time}}</p>
    </div>
    <div class="date">
      <p class="date-title">截止日期：</p>
      <p class="date-content">{{testInfo.end_time}}</p>
    </div>
    <div class="file" v-if="testInfo.file_flag==1">
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
            :on-change="onChange"
            :on-success="handleSuccess"
            :on-remove="handleRemove"
            :auto-upload="false"
          >
            <el-button class="add-file" slot="trigger" size="small">上传附件</el-button>
            <el-button class="submit" size="small" @click="submit">提交</el-button>
          </el-upload>
        </div>
      </div>
    </div>

    <!-- 教师操作 -->
    <div v-show="isTeacher" class="buttons-T">
      <el-button type="primary" @click="editTest">修改</el-button>
      <!-- 批改？评分？查收？ -->
      <el-button type="primary" @click="getSubmit">批改</el-button>
      <el-button type="danger" @click="submitDelete">删除</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      params:{
        action: 'post',
        content: '',
        test_id: this.$route.params.test_id
      },
      uploadUrl: 'http://120.79.191.54:8081/currican/test_submit',
      downloadUrl: "http://120.79.191.54:8081/currican/online_test/file?id=" + this.$route.params.test_id,
      fileInclude: false
    };
  },
  computed: {
    ...mapGetters("login", {
      isStudent: "isStudent",
      isTeacher: "isTeacher",
      isAdmin: "isAdmin"
    }),
    ...mapGetters("test", {
      testInfo: "getTest"
    })
  },
  created() {
    this.$store.dispatch('test/fetchTest', this.$route.params.test_id)
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    editTest() {
      this.$router.push({
        name: "setOnlinetest",
        params: {
          test_id: this.$route.params.test_id,
          course: this.$route.params.course,
          operation: "edit"
        }
      });
    },
    submit() {
      if(this.fileInclude){
        this.$refs.upload.submit()
      } else if(this.params.content==''){
        this.$notify({
          title: "警告",
          message: "不可以提交空的答案哟！",
          type: "warning"
        })
      } else {
        this.$http('post','/currican/test_submit',this.params,{contentType: 'multipart/form-data'}).then(res=>{
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
    getSubmit() {
      this.$router.push({
        name: "testSubmits",
        params: {
          course: this.$route.params.course,
          test_id: this.$route.params.test_id
        }
      });
    },
    submitDelete() {
      this.$confirm(
        '是否确认删除"' + this.testInfo.title + '"这个测试?',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(() => {
          // 真正路径  '/online_test'
          this.$http("post", "/currican/online_test", {
            action: "delete",
            test_id: this.$route.params.test_id
          }).then(res => {
            if (res.data.status == 0) {
              this.$message({ type: "success", message: "删除成功!" });
              setTimeout(() => {
                this.$router.push({
                  name: "onlinetest",
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
    download() {
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = this.downloadUrl
      document.body.appendChild(link)
      link.click()
    }
  }
};
</script>

<style scoped>
.title {
  display: inline-block;
}
.desc-title,
.desc-content {
  display: inline-block;
}
.file-title,
.btn-file {
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
.date-content,
.date-title {
  display: inline-block;
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
  margin-left: 10px;
}
.buttons-T {
  float: right;
  margin-right: 80px;
  margin-top: 30px;
}
.desc-title,
.file-title,
.date-title {
  font-weight: bold;
}
</style>
