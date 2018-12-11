<template>
  <div class="content" style="">
    <div class="course-box">
      <h1 class="course-name" style="text-align: center; font-size: 28px;">{{courseInfo.course_name}}</h1>
      <h3 style="margin-left: 40px">简介：</h3>
      <p class="p">{{courseInfo.course_intro}}</p>
      <h3 class="course_teacher">授课教师：</h3>
      <p class="p">{{courseInfo.teacher_name}}</p>
      <h3 class="course-time">上课时间：</h3>
      <p
        style="margin-left: 60px; margin-top: 10px"
        v-for="(time,index) in courseInfo.time_slot"
        :key="index"
      >周{{time.week_day}} &ensp;第{{time.period}}节课 &ensp;{{time.start_time}}-{{time.end_time}}</p>
      <h3 class="course-place">课室：</h3>
      <p
        style="margin-top: 15px; margin-left: 60px; margin-bottom: 15px"
      >{{courseInfo.building}}-{{courseInfo.room}}</p>
    </div>
    <hr class="hr" color="#ffd700">
    <div v-show="!isAdmin" class="course-box" align="center">
      <el-card class="box-card" shadow="never" body-style="padding-left: 40px; padding-top: 20px">
        <div slot="header" class="clearfix" style="text-align: center">
          <span style="font-style: unset; font-size: 22px; font-weight: bold;  text-align:center ">通知</span>
          <el-button v-show='isTeacher' type="text" @click="dialogFormVisible = true" class="release">发布</el-button>

          <el-dialog title="发布公告" :visible.sync="dialogFormVisible" style="">
            <el-form :model="form">
              <el-form-item label="公告标题" label-width="120px">
                <el-input v-model="form.title" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="公告内容" label-width="120px">
                <el-input v-model="form.content" type="textarea" :rows="5" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleAddNotice">确认发布</el-button>
            </div>
          </el-dialog>

        </div>
        <div v-for="notice in notices" :key="notice.notice_id" class="text item">
          <img  v-bind:src="notice.img" style="height:15px; width: 15px;"/>
          <span style="margin-left: 10px">{{notice.title}}</span>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      // course_id: this.$route.params.course,
      // courseInfo: {
      //   notices: "",
      //   course_name: "",
      //   course_intro: "",
      //   course_credit: "",
      //   school: "",
      //   section_week: "",
      //   time_slot: "",
      //   building: "",
      //   room: "",
      //   teacher_id: "",
      //   teacher_name: ""
      // },
      dialogFormVisible: false,
      form: {
        action: "post",
        sec_id: this.$route.params.course,
        title: "",
        content: ""
      }
    };
  },
  computed: {
    ...mapGetters('login', {
      isStudent: 'isStudent',
      isTeacher: 'isTeacher',
      isAdmin: 'isAdmin',
    }),
    ...mapState({
      courseInfo: state => state.course.course,
      notices: state => state.notice.noticeList
    })
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    // this.fetchCourseInfo();
    this.$store.dispatch('course/getData', this.$route.params.course)
    this.$store.dispatch('notice/getCourseNotice', this.$route.params.course)
    // console.log("course created()",this.courseInfo)
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    // this.fetchCourseInfo();
    this.$store.dispatch('course/getData', to.params.course)
    this.$store.dispatch('notice/getCourseNotice', to.params.course)
    next();
  },

  methods: {
    // fetchCourseInfo() {
    //   this.$store.dispatch('course/getData', this.course_id)
      // this.$http("get", "/notice", { sec_id: this.course_id }).then(res => {
      //   this.$set(this.courseInfo, "notices", res.data.notice);
      // });
      // this.$http("get", "/section", { sec_id: this.course_id }).then(res => {
      //   console.log("res", res);
      //   this.courseInfo = Object.assign({}, this.courseInfo, {
      //     course_name: res.data.course_name,
      //     course_intro: res.data.course_intro,
      //     course_credit: res.data.course_credit,
      //     school: res.data.school,
      //     section_week: res.data.section_week,
      //     time_slot: res.data.time_slot,
      //     building: res.data.building,
      //     room: res.data.room,
      //     teacher_id: res.data.teacher_id,
      //     teacher_name: res.data.teacher_name
      //   });
      // });
    // },
    handleAddNotice() {
      this.$http("post", "/notice.1", this.form).then(res => {
        if (res.data.status == 0) {
          this.$alert("发布成功", "消息", {
            confirmButtonText: "确定"
          });
          this.dialogFormVisible = false;
        }else{
            this.$alert("发布失败！！！", "消息", {
            confirmButtonText: "确定"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.course-box {
  text-align: left;
  padding-left: 0px;
  margin: 10px;
}
.course-name {
  margin-bottom: 20px;
}
.course-time {
  margin-top: 20px;
  margin-left: 40px;
}
.course-place {
  margin-top: 20px;
  margin-left: 40px;
}
.course_teacher {
  margin-top: 20px;
  margin-left: 40px;
}
.hr {
  margin-left: 50px;
  margin-right: 50px;
  height:1px;
}
.p {
  margin-right: 20px;
  margin-top: 5px;
  margin-left: 60px;
  
}

/* 通知 */
.text {
  font-size: 14px;
  text-align: left;
}

/*修改*/
.item {
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  margin-right: 60px;
}
.item:hover {
  background: aliceblue;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  border: 0;
  width: 100%;
  height: 100%;
}

.release {
  padding-left: 15px;
  padding-right: 15px;
  background: cornflowerblue;
  color: #fff;
  font-size: 12px;
  float: right;
}
</style>
