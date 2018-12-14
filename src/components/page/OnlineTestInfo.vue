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
    <div class="file" v-if="testInfo.file_flag==0">
      <p class="file-title">附件：</p>
      <el-button type="primary" plain icon="el-icon-download" @click="download">下载附件</el-button>
    </div>

    <!-- 学生操作 -->
    <div v-show="isStudent">
      <div class="answer">
        <p class="answer-title">回答：</p>
        <el-input type="textarea" :autosize="{ minRows: 5}" placeholder="请输入内容" v-model="content"></el-input>

        <div class="button">
          <el-upload
            class="upload-demo"
            ref="upload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button class="add-file" slot="trigger" size="small">上传附件</el-button>
            <el-button class="submit" size="small" @click="submitUpload">提交</el-button>
          </el-upload>
        </div>
      </div>
    </div>

    <!-- 教师操作 -->
    <div v-show="isTeacher" class="buttons-T">
      <el-button type="primary" @click="editAss">修改</el-button>
      <!-- 批改？评分？查收？ -->
      <el-button type="primary" @click="getSubmit">批改</el-button>
      <el-button type="danger" @click="submitDelete">删除</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
// import fileDownload from 'js-file-download'

export default {
  data() {
    return {
      test_id: this.$route.params.test_id,
      testInfo: {
        test_id: "",
        title: "",
        content: "",
        start_time: "",
        end_time: "",
        file_id: "",
        file_name: "",
        file_flag: 0
      },
      content: "",
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  computed: {
    ...mapGetters("login", {
      isStudent: "isStudent",
      isTeacher: "isTeacher",
      isAdmin: "isAdmin"
    })
  },
  created() {
    this.fetchTestInfo();
  },
  beforeRouteUpdate(to, from, next) {
    this.fetchTestInfo();
    next();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    fetchTestInfo() {
      this.$http("get", "/v1/online_test/" + this.test_id, {
        test_id: this.test_id
      }).then(res => {
        this.testInfo.test_id = res.data.test_id;
        this.testInfo.title = res.data.title;
        this.testInfo.content = res.data.content;
        this.testInfo.start_time = res.data.start_time;
        this.testInfo.end_time = res.data.end_time;
        this.testInfo.file_id = res.data.file_id;
        this.testInfo.file_name = res.data.file_name;
      });
    },
    editAss() {
      this.$router.push({
        name: "setOnlinetest",
        params: {
          test_id: this.test_id,
          course: this.$route.params.course,
          operation: "edit"
        }
      });
    },
    submit() {
      this.$http("post", "/v1/test_submit", {
        action: "post",
        test_id: this.test_id,
        content: this.content
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    // 点击文件列表中已上传的文件时的钩子
    handlePreview(file) {
      console.log(file);
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
          this.$http("post", "/v1/admin/course", {
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
      let downloadUrl = "http://localhost:3000/v1/online_test/file/" + this.$route.params.test_id;
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = downloadUrl
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
