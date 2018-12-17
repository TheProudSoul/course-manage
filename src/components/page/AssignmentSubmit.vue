<template>
  <div class="content">
    <!-- 返回键 -->
    <!--<el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>-->
    <div>
      <el-button class="btn-return" icon="el-icon-back" circle @click="back"></el-button>
      <h3 class="title">{{submit.student_name}}的提交记录</h3>
    </div>
    <hr color="#d3d3d3" style="clear: both">
    <!-- <el-row :gutter="10" type="flex" class="row-bg" justify="center">
      <el-col :span="3"><div class="grid-content vector-label">测试标题：</div></el-col>
      <el-col :span="12"><div class="grid-content">{{submit.student_name}}</div></el-col>
<<<<<<< Updated upstream
    </el-row>-->
    <div class="vector">
      <el-row type="flex" class="row">
        <el-col :span="2" :offset="6">
          <div class="grid-content vector-label">学生姓名：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">{{submit.student_name}}</div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row">
        <el-col :span="2" :offset="6">
          <div class="grid-content vector-label">学号：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">{{submit.student_no}}</div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row">
        <el-col :span="2" :offset="6">
          <div class="grid-content vector-label">提交内容：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">{{submit.content}}</div>
        </el-col>
      </el-row>
      <el-row type="flex" v-if="submit.file_flag==1" class="row">
        <el-col :span="2" :offset="6">
          <div class="grid-content vector-label">附件：</div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content">
            <el-button type="primary" plain icon="el-icon-download" @click="download">下载附件</el-button>
          </div>
        </el-col>
      </el-row>
      <el-row type="flex" class="row">
        <el-col :span="2" :offset="6">
          <div class="grid-content vector-label">分数：</div>
        </el-col>
        <el-col :span="12">
          <el-input
            class="point"
            max="100"
            size="small"
            suffix-icon="el-icon-star-on"
            v-model="mark"
          ></el-input>
          <el-button type="primary" plain @click="setMark">评分</el-button>
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  data () {
    return {
      mark: "",
      downloadUrl: 'http://120.79.191.54:8081/currican/assign_submit/file?id=' + this.$route.params.submit_id
    };
  },
  computed: {
    ...mapGetters("assignment", {
      submit: "getSubmit"
    })
  },
  created() {
    this.$store.dispatch(
      "assignment/fetchSubmit",
      this.$route.params.submit_id
    )
    setTimeout(()=>{
      this.mark = this.submit.mark
    },500)
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    setMark() {
      let message = "";
      if (this.mark == "") {
        this.$message({
          showClose: true,
          message: "分数不能为空！",
          type: "error"
        });
      } else if (this.mark == this.submit.mark) {
        this.$message({
          showClose: true,
          message: "不要重复提交相同的分数哦~",
          type: "error"
        });
      } else {
        if (this.submit.mark != "") {
          message =
            "您已有评分记录：“" +
            this.submit.mark +
            "”,是否确定重新提交分数：“" +
            this.mark +
            "”";
        } else {
          message = "您的评分为“" + this.mark + "”";
        }
        this.$confirm(message, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$http("post", "/currican/assign_submit", {
              action: "put",
              sub_id: this.$route.params.submit_id,
              mark: this.mark
            }).then(res => {
              if (res.data.status == 0) {
                this.$message({ type: "success", message: "分数提交成功!" });
                setTimeout(() => {
                  this.$router.push({
                    name: "assignmentSubmits",
                    params: {
                      course: this.$route.params.course,
                      assign_id: this.$route.params.assign_id
                    }
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
      }
    },
    download(){
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = this.downloadUrl
      document.body.appendChild(link)
      link.click()
    }
  }
}
</script>

<style>
.title {
  display: inline-block;
  font-size: 24px;
  margin-top: 10px;
  margin-bottom: 15px;
}
.vector {
  text-align: left;
}
.row {
  margin-bottom: 30px;
}
.vector-label {
  font: 1em "Microsoft YaHei";
  font-weight: bold;
}
.vector-data {
  display: inline-block;
  width: 50%;
}
.point {
  color: "#ff9900";
  display: inline-block;
  width: 4rem;
}
</style>
