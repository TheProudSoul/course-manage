<template>
  <div class="content">
    <div class="course-box">
      <h1 class="course-name" style="text-align: center">{{course_name}}</h1>
      <h3 style="margin-left: 60px">简介：</h3>
      <p class="p">{{course_intro}}</p>
      <h3 class="course_teacher">授课教师：</h3>
      <p class="p">{{teacher_name}}</p>
      <h3 class="course-time">上课时间：</h3>
      <p style="margin-left: 60px; margin-top: 10px">{{time_slot}}</p>
      <h3 class="course-place">课室：</h3>
      <p style="margin-top: 5px; margin-left: 60px; margin-bottom: 10px">{{building}}-{{room}}</p>
    </div>
    <hr class="hr" color="#ffd700">
    <div class="course-box" align="center">
      <el-card class="box-card" shadow="never" body-style="padding-left: 60px; padding-top: 20px">
        <div slot="header" class="clearfix" style="text-align: center">
          <span style="font-style: unset; font-size: 18px">通知</span>
        </div>
        <div v-for="notice in notices" :key="notice.notice_id" class="text item">
          <i class="fa fa-comment"></i>
          <span style="margin-left: 10px">{{notice.title}}</span>
        </div>
      </el-card>
      <!-- <el-table :data="tableData">
        <el-table-column label="通知">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </template>
        </el-table-column>
      </el-table>-->
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      course_id: this.$route.params.course,
      notices: "",
      course_name: "",
      course_intro: "",
      course_credit: "",
      school: "",
      section_week: "",
      time_slot: "",
      building: "",
      room: "",
      teacher_id: "",
      teacher_name: ""
    };
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.fetchData()
    next()
  },
  methods: {
    fetchData() {
      this.$http("get", "/notice",{sec_id:this.course_id}).then(res => {
        this.notices = res.data.notice;
      });
      this.$http("get", "/section",{sec_id:this.course_id}).then(res => {
        this.notices = res.data.notice;
        this.course_name = res.data.course_name;
        this.course_intro = res.data.course_intro;
        this.course_credit = res.data.course_credit;
        this.school = res.data.school;
        this.section_week = res.data.section_week;
        this.time_slot = res.data.time_slot;
        this.building = res.data.building;
        this.room = res.data.room;
        this.teacher_id = res.data.teacher_id;
        this.teacher_name = res.data.teacher_name;
      });
    }
  }
}
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
  margin-left: 60px;
}
.course-place {
  margin-top: 20px;
  margin-left: 60px;
}
.course_teacher{
  margin-top: 20px;
  margin-left: 60px;
}
.hr {
  margin-left: 30px;
  margin-right: 30px;
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
.item:hover{
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
  width: 100%;
  height: 100%;
}
</style>
