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
      >{{assignmentInfo.title}}</h3>
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
    <div class="file">
      <p class="file-title">附件：</p>
      <el-button type="text" class="btn-file">{{assignmentInfo.file_name}}</el-button>
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
    <div v-show="isTeacher">
      <el-button type="text" @click="editAss">修改</el-button>
      <el-button type="text" @click="getSubmit">批改</el-button>
      <el-button type="text" @click="submitDelete">删除</el-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      assignment_id: this.$route.params.assign_id,
      content: "",
      assignmentInfo: {
        assign_id: "",
        title: "",
        content: "",
        release_time: "",
        deadline: "",
        file_id: "",
        file_name: ""
      },
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
    ...mapGetters('login', {
      isStudent: 'isStudent',
      isTeacher: 'isTeacher',
      isAdmin: 'isAdmin',
    })
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchAssignmentInfo();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchAssignmentInfo();
    next();
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    fetchAssignmentInfo() {
      this.$http("get", "/assignment/" + this.assignment_id, {
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
      this.$http("post", "/assign_submit", {
        action: "post",
        ass_id: this.assignment_id,
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
        name: "assignmentSubmits",
        params: {
          course: this.$route.params.course,
          assign_id: this.$route.params.assign_id
        }
      });
    }
  }
};
</script>

<style scoped>
.btn-return,
.title {
  display: inline-block;
}
.btn-return {
  margin-top: 10px;
  margin-left: 5px;
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
}
</style>
